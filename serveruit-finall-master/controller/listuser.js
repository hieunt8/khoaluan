var User = require('../model/User');

exports.listuser= async (req, res, next) => {
    User.find().sort({_id: -1 })
    .exec(function (err, data) {
        if (err) return handleError(err);
        res.json(data);
    })
}