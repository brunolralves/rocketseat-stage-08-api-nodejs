import sqliteConnection from '../../sqlite/index.js';
import createTableUsers from './createTableUsers.js';

async function migrationsRun(){
	const schemas = [
		createTableUsers
	].join('');

	sqliteConnection()
		.then(db => db.exec(schemas))
		.catch(error => console.error(error));
}

export default migrationsRun;