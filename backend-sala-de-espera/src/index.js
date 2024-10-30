const app = require('./app');
const db = require('./models');
const dotenv = require('dotenv');
const http = require('http');
const { configureSockets } = require('./sockets');

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app.callback());
const io = configureSockets(server);

app.context.io = io;

db.sequelize
 .authenticate()
 .then(() => {
   console.log('Connection to the database has been established successfully.');
   server.listen(PORT, (err) => {
     if (err) {
       return console.error('Failed', err);
     }
     console.log(`Listening on port ${PORT}`);
     return server;
   });
 })
 .catch((err) => console.error('Unable to connect to the database:', err));
