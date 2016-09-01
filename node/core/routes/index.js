// define all our routes
module.exports = function(options) {
	return [{
		method: 'GET',
		path: '/',
		handler: (request, reply) => {
			//reply('<h1> Hello Hapi!!</h1>');
			reply.view('index', {
				// object which can be used to pass data and can be rendered statically by hapi within index.html page while serving
				recordCount: options.data.length
			});
		}
	},{
		method: 'GET',
		path: '/public/{param*}', // path resolution is done by inert plugin
		handler: {
			directory: {
				path: 'public'
			}
		}
	},{
		method: 'GET',
		path: '/babel/browser.min.js',
		handler:{
			file: 'node_modules/babel-core/browser.min.js'
		}
	},{
		method: 'GET',
		path: '/output/{param*}',
		handler: {
			directory: {
				path: '../output'
			}
		}
	}];
}