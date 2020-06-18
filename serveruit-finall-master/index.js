//module
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');
var url = 'mongodb://localhost:27017/uit';
const port = 10000;
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const router = express.Router()
router.use((req, res, next) => {
  next()
})

require('./route/chatreal.route.js')(router, io);
require('./route/route.js')(router);

app.use(bodyParser.json());
app.use(cors());
app.use('/uit', router);
server.listen(process.env.PORT || port, () => console.log(`Server is running port ${port}`));
mongoose.Promise = global.Promise
//Connecting to the database
mongoose
  .connect(
    url,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log('Successfully connected to the database')
  })
  .catch(() => {
    console.log('Could not connect to the database. Exiting now...')
    process.exit()
  })



