
// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
require('dotenv').config()

// Get our API routes
const api = require('./server/routes/api');

// Get the database connector
const db = require('./server/db');

// Import Models
// const User = require('./server/models/User');

const app = express();

// graphql
const cors = require('cors');
app.use(cors())
const {schema} = require('./server/graphql/graphql-schema');
const graphqlHTTP = require('express-graphql');
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Set our api routes
app.use('/api', api);

/** Angular */
// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist/TryAngular')));
// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/TryAngular/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);


/** Socket IO */
var io = require('socket.io')(server);
io.on('connection', function(client) {
  console.log(`${client.id} has connected!`);
  client.on('disconnect', function() {
    console.log(`${client.id} has disconnected`);
  });
  // client.on('room', function(data) {
  //     client.join(data.roomId);
  //     console.log(' Client joined the room and client id is '+ client.id);

  // });
  // client.on('toBackEnd', function(data) {
  //             client.in(data.roomId).emit('message', data);
  // })
});

/**
 * Listen on provided por t, on all network interfaces.
 */

db().then(async () => {
  server.listen(port, () => console.log(`API running on http://localhost:${port}`));

  // let user = new User({
  //   username: "samir",
  //   password: "123456"
  // });

  // user.save(function (err) {
  //   // if (err) return handleError(err);
  //   console.log("ERROR");
  // });
});
