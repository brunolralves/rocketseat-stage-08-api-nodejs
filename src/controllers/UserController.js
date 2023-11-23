import AppError from '../utils/AppError.js';
import sqliteConnection from '../database/sqlite/index.js';
import {randomUUID} from 'crypto';
import PasswordValidation from '../utils/PasswordValidation.js';


const database = await sqliteConnection();
class UserController{

	async create(req,res){
		const { name, password, email } = req.body;
		const encryptor = await new PasswordValidation;
		const hashedPassword = await encryptor.encrypt(password);
		try {
			const checkUserExists = await database.get('SELECT * FROM users WHERE email = (?)',[email]);

			if(checkUserExists){
				throw new AppError('Email já em uso');
			}

			await database.run('INSERT INTO users (id,name,email,password) VALUES (?,?,?,?)',[randomUUID(),name,email,hashedPassword]);
			
		} catch (error) {
			return res.json({});
		}
		
		return res.status(201).json({});
	}

	async update(req, res){		
		const { name,email, avatar } = req.body;
		const { id } = req.params;
		try {
			const user = await database.get('SELECT * FROM users WHERE user_id = (?)',[id]);
			if(!user){
				throw new AppError('Usuario não encontrado');
			}

			user.name = name ?? user.name;
			user.email = email ?? user.email;
			user.avatar = avatar ?? user.avatar;

			
			await database.run(`
			UPDATE users SET 
			name = ?, 
			email = ?, 
			avatar = ?,
			updated_at = datetime('now','localtime') 
			WHERE user_id = ?`,
			[user.name,user.email,user.avatar,user.id]);

			return res.status(201).json();
		} catch (error) {
			return res.status(400).json(error);
		}
	}
}

export default UserController;