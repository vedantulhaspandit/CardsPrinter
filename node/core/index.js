'use strict';
const Path = require('path');

function core(server, options, next) { // options refer to data from app.js
	// Load Routes
	server.route(require('./routes')(options));


	// Configure Hapi to use Handlebars to render html files
	server.views({ // viewsmethod belongs to vison
		engines: {
			html: require('handlebars') // sets vision to use handlebar whenever a file with .html extension is encountered
		}, 
		path: Path.join(__dirname, '../views') // location of html files
	});

	// Core Logic
	server.register({ // registering the main plugin
		register: require('./main'),
		options: { // main plugin has to deal with student data bought via options variable
			data: options.data
		}
	}, error => {
		if (error) {
			console.log('There was an error loading the main plugin');
			server.log('error', 'Main plugin could not be loaded!');
		}
	});

	return next();
}

core.attributes = {
	name: 'core',
	dependencies: ['inert', 'vision'] // name of plugins for core to work, loaded before core 
}

module.exports = core;