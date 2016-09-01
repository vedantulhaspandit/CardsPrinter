'use strict';
const Stomp = require('stomp-client');
const SocketIO = require('socket.io');

function main(server, options, next) {
// Core functionality begins 
   // Publish to outqueue, subscribe from inqueue
    const outQueue = '/queue/toPython'; // used for sending data to python script over apollo
    const inQueue = '/queue/fromPython'; // used for recieving data back from apollo
    const connectOpt = [process.env.appHost, process.env.appPort, process.env.appUser, process.env.appPass];
   // const client = new Stomp('localhost', 61613, 'club', 'musichouse'); // node --harmony-spreadcalls app.js <staging feature>
    const client = new Stomp(...connectOpt); // stomp constructor doesnot accept an array but a list of comma seperated values, ...(spread opearator) converts array into list of comma seperated values
    const io = SocketIO(server.listener); // bind socket.io to server instance
    const events = require('events');
    const observe = new events.EventEmitter();
    let itemArray = [];
     
    // Promises
    function stompClient() { 
        return new Promise( (resolve, reject) => { // to check whether coneected to apache apollo or not 
            client.connect( sessionId => { 
                console.log('Connected to Apollo');

                client.subscribe(inQueue, (body) => {
                    itemArray.push(body);
                    // emit an event when u push an item into array
                    observe.emit('set');
                }); // data will come back as it is processed i.e. one record at a time

                resolve(sessionId, client); // returning resolve state if connection is achieved 
            }, error => {
                reject(error); // passing the error message so that it can be recieved
            });
        });
    }

    // checking if socket.io on server is able to connect to client    
 function ioConnect() {
    io.on('connection', socket => {
       console.log('Connected');
                if (itemArray.length > 0) {
                    // keep the button disabled
                    socket
                        .emit('buttonState', { 
                            state: false 
                        })
                        .emit('allData', { 
                            dataArray: itemArray 
                        });
                       
                } else {
                    // enable the button
                    socket.emit('buttonState', { 
                        state: true 
                    });
                }

                // Publish data to apollo
                socket.on('begin', () => {
                    client.publish(outQueue, JSON.stringify (options.data)); // stomp is a text oriented protocol, hence JSON.stringify used
                });

 /*               // Watch the itemArray for changes and then asynchronously fireback callback function
                 //Array.observe(itemArray, () => {
                   var p = new Proxy(itemArray, () => {  
                    socket.emit('item', {
                        dataArray: itemArray[itemArray.length - 1] // accessing the last inserted item (most recently inserted item) in the itemArray
                    });
                });   */

                observe.on('set', () => {
                   socket.emit('item', {
                        dataArray: itemArray[itemArray.length - 1] // accessing the last inserted item (most recently inserted item) in the itemArray
                    });
                });   
                  
    });
 }

     // Kick Start
    stompClient() // once the stompClient() returns aresolve promise, we invoke the ioConnect
        .then(ioConnect)
        .catch( err => {
            console.error('There was an error :: ' + err);
            server.log('error', 'Error : ' + err);
    });



    return next();
}

main.attributes = {
	name: 'main'
}

module.exports = main;