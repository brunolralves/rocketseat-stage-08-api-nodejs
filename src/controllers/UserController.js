import AppError from '../utils/AppError.js';
import sqliteConnection from '../database/sqlite/index.js';
import {randomUUID} from 'crypto';
import PasswordValidation from '../utils/PasswordValidation.js';

const validation = new PasswordValidation();
class UserController{

	async create(req,res){
		const { name, password, email } = req.body;
		const hashedPassword = validation.Encrypt(password);
		const database = await sqliteConnection();
		try {
			const checkUserExists = await database.get('SELECT * FROM users WHERE email = (?)',[email]);

			if(checkUserExists){
				throw new AppError('Email já em uso');
			}

			await database.run('INSERT INTO users (id,name,email,password) VALUES (?,?,?,?)',[randomUUID(),name,email,hashedPassword]);
			
		} catch (error) {
			return res.json(error);
		}
		
		return res.status(201).json({});
	}

	async update(req, res){
		const database = await sqliteConnection();
		const { name,email, avatar } = req.body;
		const { id } = req.params;

		try {
			const userInDatabase = await database.get('SELECT * FROM users WHERE user_id = (?)',[id]);
			if(!userInDatabase){
				console.log('Cai aqui!!');
				throw new AppError('Usuario não encontrado');
			}
			database.run('UPDATE users SET name = ?, email = ?, avatar = ? WHERE user_id = ?',[name,email,avatar,id]);


			return res.status(201).json();
		} catch (error) {
			return res.status(400).json(error);
		}
	}
}

export default UserController;