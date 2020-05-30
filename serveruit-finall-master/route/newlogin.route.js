const checklogin = require('../controller/User')
module.exports = (app) => {
    // eslint-disable-next-line
    app.post('/newlogin',checklogin.Createnewuser) // Check login when logging into the website
  }