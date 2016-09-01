'use strict';
require('dotenv').load();
const Hapi = require('hapi');
//const dataset; //  require('../data/studentData.json');
const server = new Hapi.Server();

// Define Server Config
server.connection({
    // host is set to default
    port: process.env.port || 3000
});

// mounting and registering the plugins eg: core
server.register([{  // every plugin needs to be registred through an object that goes inside the array
    register: require('inert')
},{
    register: require('vision')
},{
    register: require('good'),
    options: {
        opsInterval: 10000,
        reporters: [{
            reporter: require('good-file'),
            events: {
                log: '*',       
                ops: '*'
            },
            config: './applog.log' // filename to write logs to
        }]
    }
},{
    register: require('./core'),
    options: {
      data: require('../data/studentData.json')
    }
}], error => {
   if (error) {
   	  console.log("Error: ", error);
      server.log("Error: ", error);
   } else {
   	  // Start the server
   	  server.start(() => {
           console.log('Hapi Server running at : ', server.info.uri);
	  });
   }
})


