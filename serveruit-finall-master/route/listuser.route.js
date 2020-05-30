const listuser = require('./../controller/listuser');
module.exports = (app) => {
    app.get('/listuser',listuser.listuser);
}