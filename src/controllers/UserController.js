import AppError from '../utils/AppError.js';
import sqliteConnection from '../database/sqlite/index.js';
import {randomUUID} from 'crypto';

class UserController{

	async create(req,res){
		const { name, password, email } = req.body;

		const database = await sqliteConnection();

		try {
			const checkUserExists = await database.get('SELECT * FROM users WHERE email = (?)',[email]);

			if(checkUserExists){
				throw new AppError('Email já em uso');
			}

			await database.run('INSERT INTO users (id,name,email,password) VALUES (?,?,?,?)',[randomUUID(),name,email,password]);
			
		} catch (error) {
			return res.json(error);
		}
		
		return res.status(201).json({});
	}

}

export default UserController;