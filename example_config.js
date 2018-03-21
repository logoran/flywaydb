var env = process.env;

module.exports = {
	url: `jdbc:mysql://${env.PGHOST}:${env.PGPORT}/${env.PGDATABASE}`,
	locations: 'filesystem:models/migrations',
	user: env.PGUSER,
	password: env.PGPASSWORD,
	sqlMigrationSuffixes: '.sql'
};