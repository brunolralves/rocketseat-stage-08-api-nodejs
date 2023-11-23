import sqliteConnection from '../database/sqlite/index.js';
import AppError from '../utils/AppError.js';
import PasswordValidation from '../utils/PasswordValidation.js';


class UserCredentialsController{
  
	async update(req,res){
		const database = await sqliteConnection();
		const encryptor = new PasswordValidation;
		const {newPassword, oldPassword ,email} = req.body;
		const user = await database.get('SELECT * FROM users WHERE email = ?',[email]);
    
		try {

			if(!user) throw new AppError('Usuario não encontrado');
			

			if(newPassword && !oldPassword) throw new AppError('É necessario informar a senha atual para redefinir a senha!');

			if(newPassword && oldPassword) {
				const checkOldPassword = await encryptor.isSamePassword(oldPassword,user.password);

				if(!checkOldPassword) throw new AppError('Senha antiga não confere');
			}

			user.password = await encryptor.encrypt(newPassword);
			user.email = email;

			await database.run(`
			UPDATE users SET
			password = ?,
			updated_at = datetime('now','localtime')
			WHERE email = ?`,
			[user.password,email]);

			return res.json({'message': 'Password changed!'});

		} catch (error) {
			return res.json(error);
		}
	}
}

export default UserCredentialsController;