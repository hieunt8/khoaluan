
module.exports = (app, io) =>{
    const chatreal = require('../controller/Onlinechat')(io)
    // app.get('/chatreal', chatreal.ChatReal);
}