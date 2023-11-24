import { Router } from 'express';
import usersRoutes from './user.routes.js';
import usersCredentialsRoutes from './userCredencials.routes.js';
import notesRoutes from './notes.routes.js';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/alterarsenha', usersCredentialsRoutes);
routes.use('/notes', notesRoutes);


export default routes;
