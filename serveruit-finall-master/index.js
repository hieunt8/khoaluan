//module
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var fs = require('fs');
var cors = require('cors');
var XLSX = require('xlsx');
var url = 'mongodb://localhost:27017/uit';
var uitRoute = require('./route/route')
var session = require('express-session');
const port = 10000;
// const app = express();
var request = require('request');
var cheerio = require('cheerio');
var request = require('request');
var loginJar = request.jar();
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//Router
const router = express.Router()
router.use((req, res, next) => {
  // .. some logic here .. like any other middleware
  next()
})
require('./route/chatreal.route.js')(router,io);
require('./route/checklogin.route.js')(router);
require('./route/comment.route.js')(router);
require('./route/eschedule.route.js')(router);
require('./route/getdeadline.route.js')(router);
require('./route/noticedaa.route.js')(router);
require('./route/schedule.route.js')(router);
require('./route/creategroup.route.js')(router);
require('./route/newlogin.route.js')(router);
require('./route/listuser.route.js')(router);
// require('./route/updateuser.route.js')(router);
// require('./route/deleteuser.route.js')(router);

app.use(bodyParser.json());

app.use(cors());

app.use('/uit', router);

server.listen(process.env.PORT || 10000, () => console.log(`Server is running port ${port}`));


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



