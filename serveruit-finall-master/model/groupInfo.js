const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden')({ defaultHidden: { __v: true } });

const groupInfo = mongoose.Schema(
  {
    groupName: String,
    Status: String,
    version: { type: Number, unique: true, required: true },
    listMssv: String,
    senderMssv: String,
    senderInfo: {},
    userAddRemove: String,
    userAddRemoveSibiling: {},
    useraddRemoveInfo: {},
    treeInfo: String,
    keyPair: String,
    shareKey: String,
    packetUpdate: String,
    lishcoPathNode: []
  }
)
const GroupInfo = mongoose.connection.useDb('GroupInfo');


exports.saveGroupInfo = async (data) => {
  // console.log("2222222222222222222");
  const groupInfoModel = GroupInfo.model(data.groupName, groupInfo);
  const newGroupInfo = new groupInfoModel({
    groupName: data.groupName,
    Status: data.Status,
    version: data.version,
    listMssv:data.listMssv,
    senderMssv: data.senderMssv,
    senderInfo: data.senderInfo,
    userAddRemove: data.userAddRemove,
    useraddRemoveInfo: data.useraddRemoveInfo,
    userAddRemoveSibiling: data.userAddRemoveSibiling,
    keyPair: data.keyPair,
    shareKey: data.shareKey,
    treeInfo: data.treeInfo,
    packetUpdate: data.packetUpdate,
    lishcoPathNode: data.lishcoPathNode
  })
  // res.json(newGroupInfo);
  // console.log("Create group", newGroupInfo.groupName)
  groupInfoModel.find({ version: data.version })
    .exec(function (err, data) {
      // console.log("data", data);
      if (err) return handleError(err);
      if (!data.length) {
        newGroupInfo.save(function (err) {
          if (err) throw err;
        })
      }
    })
}


exports.getDataGroup = async (req, res, next) => {
  const { data } = req.body;
  const groupInfoModel = GroupInfo.model(data.groupName, groupInfo);
  groupInfoModel.find({ "version": { $gt: data.version } }).sort({ _id: -1 })
    .exec(function (err, data) {
      if (err) return handleError(err);
      res.json(data);
      // console.log(data);
    })
}

exports.getspecialDataGroup = async (req, res, next) => {
  const { data } = req.body;
  const groupInfoModel = GroupInfo.model(data.groupName, groupInfo);
  // console.log(data);
  groupInfoModel.find({ "userAddRemove": data.userAddRemove, "Status": data.Status }).sort({ _id: -1 })
    .exec(function (err, data) {
      // console.log(data);
      if (err) return handleError(err);
      res.json(data);
      // console.log(data);
    })
}