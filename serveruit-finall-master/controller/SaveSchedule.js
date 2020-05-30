
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


exports.SaveSchedule = async (req, res, next) => {
    let result = data.filter(async (data) => {
        const NewSchedule = new Schedule({
            day:data.day,
            subject_code: data.subject_code,
            subject_name: data.subject_name,
            teacher_name: data.teacher_name,
            room: data.room,
            start_day: data.start_day,
            end_day: data.end_day,
            student_id: data.student_id
        })
        await NewSchedule.save(err => {
            if (err)
                throw (err);
            else
                console.log("success");
        })
    })
    console.log(data);


}
exports.GetSchedule = async (req, res, next) => {
    const { data } = req.body
    let result = Schedule.find({ student_id: data.student_id })
        .exec(function (err, data) {
            if (err) return handleError(err);
            console.log(data)
            res.json(data)
        })
}