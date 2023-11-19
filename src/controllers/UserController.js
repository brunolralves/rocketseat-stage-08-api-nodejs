import AppError from '../utils/AppError.js';

class UserController{

	create(req,res){
		const { username, password, email } = req.body;

		if (!username) {
			throw new AppError('Nome é obrigatorio',400);
		}

		if (!password) {
			throw new AppError('Senha é obrigatorio',400);
		}

		if (!email) {
			throw new AppError('Email é obrigatorio',400);
			
		}
		res.status(201).json({username,password,email});
	}

}

export default UserController;