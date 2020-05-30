const deleteuser = require('./../controller/deleteuser')
module.exports = (app) => {
    app.post('/deleteuser',deleteuser.deleteuser)
  }