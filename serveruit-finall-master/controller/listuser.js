var User = require('../model/User');

exports.listuser= async (req, res, next) => {
    console.log("aaaa")
    User.find().sort({_id: -1 })
    .exec(function (err, data) {
        if (err) return handleError(err);
        res.json(data);
        console.log(data);
    })
}