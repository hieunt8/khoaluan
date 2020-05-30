const saveSchedule = require('./../controller/SaveSchedule');
module.exports = (app) => {
    // eslint-disable-next-line
    app.get('/adds',saveSchedule.SaveSchedule); //Save all Students of Schedule :2
    app.post('/schedule',saveSchedule.GetSchedule); // Respone Student id and return value: Schedule :2
  }