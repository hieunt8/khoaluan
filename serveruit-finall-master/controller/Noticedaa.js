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


var RqCompensatory = async () => {
    return new Promise((resolve, reject) => {
        request.get({
            url: "https://daa.uit.edu.vn/thong-bao-nghi-bu",
        }, (err, res, body) => {
            if (err)
                throw (err);

            var $ = cheerio.load(body);
            var list = [];
            $('div[class="content"]').find('strong').each(function (index, element) {
                list.push($(element).text());
            });

            if (list != undefined) {
                resolve(list);
            }
            else {
                reject(err);
            }
        })
    })
}

exports.Compensatory = async (req, res, next) => {
    let result = await RqCompensatory();
    let result1 = await RqCroom();
    for (let i = 10; i <= 19; i++) {
        result.push(result1[i]);
    }
    let data = []
    var index;
    var getstart = [];
    let key = ["Nguyễn", "Phạm", "Lê", "Trịnh", "Trần", "Cáp", "Mai", "Hồ"];
    for (let i = 1; i <= result.length; i++) {
        if (result[i] && result[i].includes('phongdaotaodh@uit.edu.vn'))
            index = i;
    }
    var k = 0;
    var flag = true;
    for (let i = 0; i <= index - 4; i++) {
        for (let j = 0; j < 7; j++) {
            if (result[i] && result[i].includes(key[j])) {
                flag = false;
            }
        }
        if (flag == true) {
            k++;
        }
    }
    for (let i = 0; i <= result.length; i++) {
        for (let j = 0; j < 7; j++) {
            if (result[i] && result[i].includes(key[j])) {
                data.push(result[index+1+k]);
                data.push(result[i]);
                data.push(result[i + 1]);
                data.push(result[i + 2]);
                data.push(result[i + 3]);
                data.push(result[i + 4]);
                data.push(result[i + 5]);
                data.push(result[i + 6]);
                data.push(result[i + 7]);
                index++;
            }
        }
    }
    console.log(data);
    res.json(data);
}
var RqCroom = async () => {
    return new Promise((resolve, reject) => {
        request.get({
            url: "https://daa.uit.edu.vn/",
        }, (err, res, body) => {
            if (err)
                throw (err);

            var $ = cheerio.load(body);
            var list = [];
            $('div[class="item-list"]').find('a').each(function (index, element) {
                list.push($(element).text());
            });

            if (list != undefined) {
                resolve(list);
            }
            else {
                reject(err);
            }
        })
    })
}
exports.Croom = async (req, res, next) => {
    let result = await RqCroom();
    var index,data=[];
    for(let i=0;i<result.length;i++){
        if(result[i]){
            if(result[i].includes('Thông báo học bù') || result[i].includes('Thông báo nghỉ')){
              index=i;  
            }
        }
    }
    for(let i=index+1;i<result.length;i++)
    data.push(result[i]);
    res.json(data);
}