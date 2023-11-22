import { Router } from 'express';
import usersRoutes from './user.routes.js';
import usersCredentialsRoutes from './userCredencials.routes.js';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/alterarsenha', usersCredentialsRoutes);


export default routes;
