import AppError from '../utils/AppError.js';
import knex from '../database/knex/index.js';
import {randomUUID} from 'crypto';


class NotesController{

	async create(req,res){	
		const {title, description,tags,links}  = req.body;
		const {user_id} = req.params;

		const UID_NOTE = randomUUID();
		const [note_id] = await knex('notes').insert({
			UID_NOTE,
			title,
			description,
			user_id		
		});


		// const linksInsert = links.map(link =>{
		// 	return{
		// 		note_id,
		// 		url: link
		// 	};
		// });

		// await knex('links').insert(linksInsert);

    
		res.status(200);
		
	}

	
}

export default NotesController;