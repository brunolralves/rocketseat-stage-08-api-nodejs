import sqliteConnection from '../database/sqlite/index.js';
import AppError from '../utils/AppError.js';
import PasswordValidation from '../utils/PasswordValidation.js';



class UserCredentialsController{
  
	async update(req,res){
		const database = await new sqliteConnection();
		const validation = new PasswordValidation();
		const {newPassword, oldPassword ,email} = req.body;
    
		try {
			const userInDatabase = await database.get('SELECT * FROM users WHERE email = ?',[email]);

			if(!userInDatabase){
				throw new AppError('Usuario não encontrado');
			}

			if(validation.compare(userInDatabase.password, oldPassword)){
				const newPasswordEncrypted = validation.encrypt(newPassword);
				await database.run('UPDATE users SET password = ? WHERE email = ?',[newPasswordEncrypted,email]);
			}

			return res.json({success:true});
		} catch (error) {
			res.json();
		}
	}
}

export default UserCredentialsController;