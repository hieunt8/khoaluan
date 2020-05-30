
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


// exports.ReadFileEs = async (req, res, next) => {
//     var array = [];
//     testFolder = './/Excel';
//     console.log(testFolder)
//     array = fs.readdirSync(testFolder);
//     let result = [];
//     for (const file of array) {
//         var workbook = XLSX.readFile('Excel' + '/' + file, { cellDates: true });//ReadFile
//         var sheetName = workbook.SheetNames[0]; // Get Name ws=workbook.Sheets['CE104.J11.MTCL-E32'];
//         var sheetData = workbook.Sheets[sheetName];
//         var MT = sheetData.C6.w; //Mon Thi
//         var MaLop = sheetData.E6.w;//Ma Lop
//         var NT = (sheetData.F5.w).substring(9, (sheetData.F5.w).length);//Ngay Thi
//         var PT = (sheetData.F6.w).substring(11, (sheetData.F6.w).length);//Phong Thi
//         result.push(sheetData)

//         const NewSubjects = new Subjects({
//             name_subject: MT,
//             c_subject: MaLop,
//             day: NT,
//             room: PT

//         })
//         await NewSubjects.save(err => {
//             if (err) handleError(err)
//         })

//         //Get Length in Object SheetData
//         const ObjectData = Object.keys(sheetData);
//         const ObjectData_Length = ObjectData.length - 3;
//         //Connect Mongodb and Insert Data

//         for (let i = 26; i <= ObjectData_Length; i++) {

//             if (sheetData[Object.keys(sheetData)[i]]['w'].length === 8) {
//                 var MSSV = sheetData[Object.keys(sheetData)[i]]['w']
//                 var STT = sheetData[Object.keys(sheetData)[i - 1]]['w']
//                 var Ten = sheetData[Object.keys(sheetData)[i + 1]]['w']
//                 var Note = sheetData[Object.keys(sheetData)[i + 2]]['w']
//                 if (Note.length === 10) {
//                     const NewStudents = new StudentNames({
//                         name_student: Ten,
//                         student_id: MSSV,
//                         norder: STT,
//                         note: Note,
//                         room: NewSubjects._id,

//                     })
//                     await NewStudents.save(err => {
//                         if (err) return handleError(err)
//                     })
//                 }
//                 else {
//                     const NewStudents = new StudentNames({
//                         name_student: Ten,
//                         student_id: MSSV,
//                         norder: STT,
//                         note: null,
//                         room: NewSubjects._id,

//                     })
//                     await NewStudents.save(err => {
//                         if (err) return handleError(err)
//                     })
//                 }

//             }
//         }
//     }
//     res.send(sheetData)
// }
// // Get Student_id and Find()
// exports.GetExamSchedule = async (req, res, next) => {
//     const { student_id } = req.body;
//     var s = StudentNames.find({ student_id: student_id })
//         .populate('room')
//         .exec(function (err, data) {
//             if (err) return handleError(err);
//             // console.log(data)
//             res.json(data)
//         })

// }

// exports.SaveSchedule = async (req, res, next) => {
//     let result = data.filter(async (data) => {
//         const NewSchedule = new Schedule({
//             subject_code: data.subject_code,
//             subject_name: data.subject_name,
//             teacher_name: data.teacher_name,
//             room: data.room,
//             start_day: data.start_day,
//             end_day: data.end_day,
//             student_id: data.student_id
//         })
//         await NewSchedule.save(err => {
//             if (err)
//                 throw (err);
//             else
//                 console.log("success");
//         })
//     })
//     console.log(data);


// }
// exports.GetSchedule = async (req, res, next) => {
//     const { student_id } = req.body
//     let result = Schedule.find({ student_id: student_id })
//         .exec(function (err, data) {
//             if (err) return handleError(err);
//             console.log(data)
//             res.json(data)
//         })
// }
// var RequestData = async (username, password) => {
//     return new Promise((resolve, reject) => {
//         loginJar = request.jar();
//         request.get({
//             url: "https://courses.uit.edu.vn/login/index.php",
//             jar: loginJar
//         }, async (err, res, body) => {
//             let $ = cheerio.load(body);
//             let logintoken = $('[name=logintoken]').val();
//             form = {
//                 "username": username,
//                 "password": password,
//                 "logintoken": logintoken
//             };
//             request.post({
//                 url: "https://courses.uit.edu.vn/login/index.php",
//                 form: form,
//                 jar: loginJar,
//                 followAllRedirects: true,
//             }, async (err, res, body) => {
//                 request.get({
//                     url: "https://courses.uit.edu.vn/calendar/view.php?view=upcoming",
//                     jar: loginJar,
//                 }, (err, res, body) => {
//                     if (err)
//                         throw (err);
//                     var $ = cheerio.load(body);
//                     var list = [];
//                     $('div[class="row"]').find('a').each(function (index, element) {
//                         list.push($(element).text());
//                     });
//                     $('div[class="row mt-1"]').find('a').each(function (index, element) {
//                         list.push($(element).text());
//                     });
//                     $('div[class="d-inline-block"]').find('h3').each(function (index, element) {
//                         list.push($(element).text());
//                     });
//                     $('div[class="row mt-1"]').find('p').each(function (index, element) {
//                         // list3.push($(element).text());
//                     });
//                     if (list != undefined) {
//                         resolve(list);
//                     }
//                     else {
//                         reject(err);
//                     }
//                 });
//             });
//         });
//     })
// }
// var RequestLogin = async (username, password) => {
//     return new Promise((resolve, reject) => {
//         loginJar = request.jar();
//         request.get({
//             url: "https://courses.uit.edu.vn/login/index.php",
//             jar: loginJar
//         }, (err, res, body) => {
//             let $ = cheerio.load(body);
//             let logintoken = $('[name=logintoken]').val();
//             form = {
//                 "username": username,
//                 "password": password,
//                 "logintoken": logintoken
//             }
//             request.post({
//                 url: "https://courses.uit.edu.vn/login/index.php",
//                 form: form,
//                 jar: loginJar,
//                 followAllRedirects: true,
//             }, (err, res, body) => {
//                 let $ = cheerio.load(body);
//                 let data = $('.usertext').text();
//                 const image = $("body").find("img")[0].attribs.src;
//                 console.log(image);
//                 if (data) {
//                     form.flag = true;
//                     form.name = data;
//                     form.image = image;
//                     resolve(form);
//                 }
//                 else {
//                     let form = {
//                         flag: true
//                     }
//                     form.flag = false;
//                     resolve(form);
//                 }
//             })
//         })
//     })
// }
// Get Deadline of Students
// exports.GetDeadline = async (req, res, next) => {
//     const { data } = req.body;
//     let result = await RequestData(data.username, data.password)
//     res.json(result);
//     console.log(result);
// }
// exports.checkLogin = async (req, res, next) => {
//     let { data } = req.body
//     let result = await RequestLogin(data.username, data.password)
//     res.json(result);
// }
// var RqCompensatory = async () => {
//     return new Promise((resolve, reject) => {
//         request.get({
//             url: "https://daa.uit.edu.vn/thong-bao-nghi-bu",
//         }, (err, res, body) => {
//             if (err)
//                 throw (err);

//             var $ = cheerio.load(body);
//             var list = [];
//             $('div[class="content"]').find('strong').each(function (index, element) {
//                 list.push($(element).text());
//             });

//             if (list != undefined) {
//                 resolve(list);
//             }
//             else {
//                 reject(err);
//             }
//         })
//     })
// }
// var RqCroom = async () => {
//     return new Promise((resolve, reject) => {
//         request.get({
//             url: "https://daa.uit.edu.vn/",
//         }, (err, res, body) => {
//             if (err)
//                 throw (err);

//             var $ = cheerio.load(body);
//             var list = [];
//             $('div[class="item-list"]').find('a').each(function (index, element) {
//                 list.push($(element).text());
//             });

//             if (list != undefined) {
//                 resolve(list);
//             }
//             else {
//                 reject(err);
//             }
//         })
//     })
// }
// exports.Compensatory = async (req, res, next) => {
//     let result = await RqCompensatory();
//     let result1 = await RqCroom();
//     for (let i = 10; i <= 19; i++) {
//         result.push(result1[i]);
//     }
//     console.log(result1);
//     res.json(result);
// }
// exports.Croom = async (req, res, next) => {
//     let result = await RqCroom();
//     res.json(result);
// }
exports.Comment = async (req, res, next) => {
    let { data } = req.body;
    const NewPost = new Post({
        name: data.name,
        student_id: data.student_id,
        content: data.content,
        rating: data.rating,
        time: data.time,
    })
    await NewPost.save(err => {
        if (err) handleError(err)
    })
    res.json({ "status": 200 });
}
exports.ResComment = async (req, res, next) => {
    var s = Post.find().limit(20).sort({ _id: -1 })
        .exec(function (err, data) {
            if (err) return handleError(err);
            res.json(data);
        })
}
const server = require('http').createServer();
const io = require('socket.io')(server);

exports.ChatReal = async (req, res, next) => {
    let {data}= req.body
    io.on("connection", socket => {
        console.log("a user connected :D");
        socket.on(data.data2.student_id, msg => {
          console.log(msg);
          io.emit(data.data2.student_id, msg);
        });
      });
}