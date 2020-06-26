const delay = require('delay');

var Group = require('../model/Creategroup');
var GroupInfo = require('../model/groupInfo');


exports.CreategroupChat = (req, res, next) => {
  const { data } = req.body;
  // console.log("11111111111111111111", data.userAddRemove);
  const newGroup = new Group({
    groupName: data.groupName,
    listMssv: (data.listMssv + "," + data.userAddRemove).split(","),
    version: data.version,
    // treeInfo: data.treeInfo
  })
  var query = Group.find({ groupName: data.groupName })
  query.exec( async (err, data1) => {
    if (err) return handleError(err);
    if (!data1.length) {
      newGroup.save(function (err) {
        if (err) throw err;
      })
    }
    else if (data1[0].version < data.version) {
      switch (data.Status) {
        case "ADD":
          Group.updateOne(
            { groupName: data.groupName },
            {
              $set: {
                listMssv: (data.listMssv + "," + data.userAddRemove).split(","),
                version: data.version
              }
            },
            { upsert: false },
            function (err) {
              if (err) throw err;
            }
          );
          break;
        case "UPDATE":
          Group.updateOne(
            { groupName: data.groupName },
            {
              $set: {
                version: data.version
              }
            },
            { upsert: false },
            function (err) {
              if (err) throw err;
            }
          );
          await delay(500);
          res.json("ACCEPTED");
          break;
        case "UPDATE":
          break;
      }
      // console.log("@@@@@@@@");
    }
  })
  GroupInfo.saveGroupInfo(data);
}

exports.getDataGC = async (req, res, next) => {
  Group.find().sort({ _id: -1 })
    .exec(function (err, data) {
      if (err) return handleError(err);
      res.json(data);
      // console.log(data);
    })
}

exports.groupLoading = (req, res, next) => {
  const { data } = req.body;
  Group.find({ listMssv: data.mssv }).sort({ _id: -1 })
    .exec(function (err, data) {
      if (err) return handleError(err);
      res.json(data);
      // console.log(data);
    })
}

