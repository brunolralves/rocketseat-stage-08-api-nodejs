import { Router } from 'express';
import UserCredentialsController from '../controllers/UserCredentialsController.js';

const usersCredentialsRoutes = Router();
const userCredentialsController = new UserCredentialsController();



usersCredentialsRoutes.put('/alterarsenha',userCredentialsController.update);


export default usersCredentialsRoutes;