const noticedaa = require('../controller/Noticedaa')
module.exports = (app) => {
    // eslint-disable-next-line
    app.post('/compensatory', noticedaa.Compensatory);
    app.post('/croom', noticedaa.Croom);
}