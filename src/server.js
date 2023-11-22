import ('express-async-errors');
import express from 'express';
import routes from './routes/index.js';
import AppError from './utils/AppError.js';
import sqliteConnection from './database/sqlite/index.js';
import migrationsRun from './database/sqlite/migrations/index.js';

const app = express();
migrationsRun();
app.use(express.json());
app.use(routes);

sqliteConnection();

app.use((error,req,res,next)=>{
	if (error instanceof AppError){
		return res.status(error.statusCode).json({
			status:'error',
			message: error.message
		});
	}
	return res.status(500).json({
		status:'error',
		message:'Internal server error'
	});
});


const PORT = 3033;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

