const getdeadline = require('./../controller/Getdeadline')
module.exports = (app) => {
    // eslint-disable-next-line
    app.post('/deadline',getdeadline.GetDeadline); // Respone Student id, password return value : Deadline
  }