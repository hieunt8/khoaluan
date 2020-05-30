const controller = require('./../controller/Controller')
module.exports = (app) => {
    // eslint-disable-next-line
    app.post('/comment', controller.Comment);
    app.post('/rescomment', controller.ResComment);
}