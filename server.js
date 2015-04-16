var Hapi = require('hapi');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({ 
    host: '192.168.0.3', 
    port: 8000 
});

// Default static content handler:
server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'public',
            listing: true,
            index: ['deviceorientationsample.html'],
            defaultExtension: 'html',
            lookupCompressed: true
        }
    }
});

// Add the route
server.route({
    method: 'GET',
    path:'/hello', 
    handler: function (request, reply) {
       reply('hello world');
    }
});

// Start the server
server.start();
