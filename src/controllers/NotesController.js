import AppError from '../utils/AppError.js';
import knex from '../database/knex/index.js';
import {randomUUID} from 'crypto';


class NotesController{

	async create(req,res){	
		const {title, description,tags,links}  = req.body;
		const {user_id}	= req.params;
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
				url: link,
				id: randomUUID()
			};
		});
		// console.log(linksInsert);

		await knex('links').insert(linksInsert);

		
		const tagsInsert = tags.map(name =>{
			return{
				note_id,
				name,
				user_id,
				id: randomUUID()
			};
		});
		
		await knex('tags').insert(tagsInsert);

		res.json();
		
	}


	async show(req, res) {
		console.log('here');
		const {id} = req.params;

		const note = await 
		knex('notes')
			.where(x=>x.note_id = id)
			.first();
			
		const tags = 
		await knex('tags')
			.where(x => x.note_id = id)
			.orderBy('tag_id');

		const links = 
		await knex('links')
			.where(x => x.note_id = id)
			.orderBy('created_at');

		return res.json({
			...note,
			tags,
			links
		});
	}
	
	async delete(req,res){
		const {idInputed} = req.params;
		await knex('notes').where({id:idInputed}).delete();
		res.json({});
	}

	async index(req,res){
		const {tags,title,user_id} = req.query;
		let notes;

		if(tags)
		{
			const filteredTags = 
			tags.split(',')
				.map(tag => tag.trim());

			console.log(filteredTags);

			notes = 
			await knex('tags')
				.select([
					'notes.note_id',
					'notes.title',
					'notes.user_id'
				])
				.where('notes.user_id',user_id)
				.whereLike('notes.title',`%${title}%`)
				.whereIn('name',filteredTags)
				.innerJoin('notes','notes.note_id', 'tags.note_id')
				.orderBy('notes.title');

		}else
		{
			notes = 
			await knex('notes')
				.where({user_id})
				.whereLike('title',`%${title}%`)
				.orderBy('note_id');	
		}
			
		res.json(notes);
	}
}

export default NotesController;