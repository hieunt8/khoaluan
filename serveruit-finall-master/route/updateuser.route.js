const updateuser = require('./../controller/updateuser')
module.exports = (app) => {
    app.post('/updateuser',updateuser.updateuser)
  }