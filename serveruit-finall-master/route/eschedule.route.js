const saveES = require('./../controller/SaveES');
module.exports = (app) => {
    // eslint-disable-next-line
    app.get('/addes',saveES.ReadFileEs); // Read all File Excel of Exam Schedule :1
    app.post('/eschedule',saveES.GetExamSchedule); // Respone Student id and return value: Exam Schedule :1
  }