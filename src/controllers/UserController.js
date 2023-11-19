class UserController{

	// getAllUsers(){}

	// getUserById(id){}

	create(req,res){
		const { username, password, email } = req.body;

		const UserTest ={
			'username':'brunolralves',
			'password':'Bcd141910*',
			'email':'brunolralvesdev@gmail.com'
		};

		if((UserTest.username==username ||UserTest.email==email) && UserTest.password==password){
			res.send('validado com sucesso!');
		}else {
			res.send('Invalid username or password');
		}
	}

	// updateUser(id,user){}

	// deleteUser(id){}
}

export default UserController;