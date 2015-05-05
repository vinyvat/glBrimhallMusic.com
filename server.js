// mysql
var mysql     =    require('mysql');

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : 'asdf',
    database : 'musicsite',
    debug    :  true
});

function handle_database(req,res) {
    
    pool.getConnection(function selectEvent(err,connection) {
        if (err) {
          connection.release();
          return res({"code" : 100, "status" : "Error in connection database"});
        }   

        connection.on('error', function selectEventError(err) {      
              connection.release();
              return res({"code" : 100, "status" : "Error in connection database"});
        });

        console.log('connected as id ' + connection.threadId);
        
        var event_type = req.params.event_type;
        var sql = "SELECT * FROM Event WHERE event_type = ?";

        console.log("SQL="+sql+event_type);

        connection.query( sql, [event_type], function selectEventSql(err,rows,info) {
            //console.log("RSLT="+res.json(rows));
            connection.release();
            if(!err) {
                //return res(JSON.stringify(rows));
                return res(rows);
            }
        });
  });
}


// hapi web-server
var Hapi = require('hapi');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({ 
    host: '127.0.0.1', 
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

// Routes for Even CRUD:
server.route({
    method: 'GET',
    path:'/event/{event_type?}', 
    handler: function (request, reply) {
       handle_database(request, reply);
    }
});

// Start the server
server.start();
