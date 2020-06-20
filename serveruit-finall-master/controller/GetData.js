var Group = require('../model/Creategroup');
var GroupInfo = require('../model/groupInfo');

exports.getDataGroup = async (req, res, next) => {
  const { data } = req.body;
  Group.find().sort({ _id: -1 })
    .exec(function (err, data) {
      if (err) return handleError(err);
      res.json(data);
      // console.log(data);
    })
}

