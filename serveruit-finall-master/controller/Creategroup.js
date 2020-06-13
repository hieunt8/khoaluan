var Group = require('../model/Creategroup');

exports.CreategroupChat = async (req, res, next) => {
  const { data } = req.body;
  const newGroup = new Group({
    groupName: data.groupName,
    listMssv: data.listMssv,
  })
  // res.json(newGroup);
  Group.find({ groupName: data.groupName })
    .exec(function (err, data) {
      if (err) return handleError(err);
      if (!data.length) {
        console.log("Create group", newGroup.groupName)
        newGroup.save(function (err) {
          if (err) throw err;
        })
      }
    })
}

exports.getDataGC = async (req, res, next) => {
  Group.find().sort({ _id: -1 })
    .exec(function (err, data) {
      if (err) return handleError(err);
      res.json(data);
      // console.log(data);
    })
}

