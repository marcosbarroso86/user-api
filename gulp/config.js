const source = 'dist/';

module.exports = {
	clean: {
		name: 'clean',
		src: [
			source
		]
	},
	server: {
		name: 'server',
		tmp: source + 'tmp',
		src: source + 'server.js',
		jsSrc : [
			source + 'tmp/*.js',
			source + 'tmp/**/*.js'
		],
		dest: source
	},
	swagger: {
		name: 'swagger',
		src: [
			'src/swagger.json'
		],
		dest: source
	}
};
