import bcrypt from 'bcryptjs';

class PasswordValidation{

	async encrypt(password) {
  
		const salt = bcrypt.genSaltSync(8);
		const hashedPassword = await bcrypt.hashSync(password,salt);
  
		return hashedPassword;
	}

	async isSamePassword(password, oldPassword){
		const passwordValidated = await bcrypt.compare(password, oldPassword);

		return passwordValidated;
	}

}

export default PasswordValidation;