import AppError from '../utils/AppError.js';
import knex from '../database/knex/index.js';
import {randomUUID} from 'crypto';
import { response } from 'express';


class NotesController{

	async create(req,res){	
		const {title, description,tags,links}  = req.body;
		const {user_id}	= req.params;

		// const user_id = Number(userid);

		// const UID_NOTE = randomUUID();
		const id = randomUUID();

		const [note_id] = await knex('notes').insert({
			id,
			title,
			description,
			user_id
		});

		console.log(note_id);

		const linksInsert = links.map(link =>{
			return{
				note_id,
				url: link
			};
		});
		// console.log(linksInsert);

		await knex('links').insert(linksInsert);

		// const id_tag
		const tagsInsert = tags.map(name =>{
			return{
				note_id,
				name,
				user_id
			};
		});
		
		console.log(tagsInsert);
		await knex('tags').insert(tagsInsert);

		res.json();
		
	}


	async show(req, res) {
		console.log('here');
		const {id} = req.params;

		const note = await knex('notes').where(x=>x.note_id = id);
		const tags = await knex('tags').where(x => x.note_id = id).orderBy('name');
		const links = await knex('links').where(x => x.note_id = id).orderBy('created_at');

		return res.json({
			...note,
			tags,
			links
		});
	}
	
}

export default NotesController;