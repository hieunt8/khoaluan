const checklogin = require('./../controller/Checklogin')
module.exports = (app) => {
    // eslint-disable-next-line
    app.post('/checklogin',checklogin.checkLogin) // Check login when logging into the website
  }