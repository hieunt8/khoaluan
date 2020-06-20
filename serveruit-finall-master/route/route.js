const checklogin = require('../controller/User')
const listuser = require('../controller/listuser');
const creategroup = require('../controller/Creategroup');
const getdataGroup = require('../model/groupInfo');
// const checklogin = require('./../controller/Checklogin')
module.exports = (app) => {
    // eslint-disable-next-line
  app.post('/newlogin', checklogin.Createnewuser) // Check login when logging into the website
  app.get('/listuser', listuser.listuser);
  app.post('/creategroup', creategroup.CreategroupChat);
  app.post('/grouploading', creategroup.groupLoading);
  app.post('/getdataGroup', getdataGroup.getDataGroup);
  app.get('/getcreategroup', creategroup.getDataGC);
  // app.post('/checklogin',checklogin.checkLogin)
}
