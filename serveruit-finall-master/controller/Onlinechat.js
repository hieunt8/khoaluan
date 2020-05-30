
var url = 'mongodb://localhost:27017/uit';
const mongoose = require('mongoose');
const StudentsId = require('../model/StudentsId')
var StudentNames = require('../model/StudentNames')
var Subjects = require('../model/Subjects');
var Schedule = require('../model/Schedule')
var Post = require('../model/Post');
var data = require('../data/data');
var XLSX = require('xlsx');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var request = require('request');
var loginJar = request.jar();
var chat = require('./../model/Chat');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
module.exports = (io) => {

  io.on("connection", socket => {
    socket.on('join', async ({ name, room }, callback) => {   // Joim room 
      const { error, user } = await addUser({ id: socket.id, name, room });
      if (error) return callback(error);
      console.log("User connect: ", user)
      socket.join(user.room);
      socket.emit('message', { user: 'Chào mừng' + " ", text: `${user.name} đã tham gia phòng chat ${user.room}.` }); // Welcome to room
      socket.broadcast.to(user.room).emit('message', { user: " ", text: `${user.name} vừa tham gia phòng chat` });
      let userinroom = await getUsersInRoom(user.room); //get userinroom
      // io.to(user.room).emit('roomData', { room: user.room, users: userinroom.name });

      callback();
    });
    socket.on('sendMessage', async msg => {
      const user = await getUser(socket.id);
      console.log("User: ", user.name, " Send: ", msg.text);
      io.to(user.room).emit('sendMessage', { user: user.name, text: msg });
      // callback();
    });
    socket.on('Disco', async () => {
      const user = await removeUser(socket.id);
      console.log("User Disco: ", user)
      if (user) {
        io.to(user.room).emit('message', { user: ' ', text: `${user.name} đã rời khỏi phòng.` });
        // io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
      }
    })
  })
}
