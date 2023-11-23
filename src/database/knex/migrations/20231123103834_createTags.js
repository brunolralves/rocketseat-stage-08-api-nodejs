

export const up = knex => knex.schema.createTable('tags', table => {
	table.increments('tag_id');
	table.text('id');
	table.text('name').notNullable();

	table.integer('user_id').references('user_id').inTable('users');
	table.integer('note_id').references('note_id').inTable('notes').onDelete('CASCADE');

	table.timestamp('created_at').default(knex.fn.now());
});

export const down = knex => knex.schema.dropTable('tags');