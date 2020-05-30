const creategroup = require('./../controller/Creategroup');
module.exports = (app) => {
    // eslint-disable-next-line
    app.post('/creategroup', creategroup.CreategroupChat);
    app.get('/getcreategroup',creategroup.getDataGC);
}