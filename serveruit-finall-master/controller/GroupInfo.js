// var GroupInfo = require('../model/groupInfo');

exports.saveGroupInfo = async (data) => {
  console.log("2222222222222222222");
  const groupInfoModel = GroupInfo.model(data.groupName, groupInfo);
  const newGroupInfo = new groupInfoModel({
    groupName: data.groupName,
    Status: data.Status,
    version: data.version,
    senderName: data.senderName,
    senderInfo: data.senderInfo,
    userAddRemove: data.userAddRemove,
    useraddRemoveInfo: data.useraddRemoveInfo
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