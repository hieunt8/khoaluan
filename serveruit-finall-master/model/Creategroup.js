const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden')({ defaultHidden: { __v: true } });

const Group = mongoose.Schema(
  {
    groupName: { type: String, unique: true, required: true },
    listMssv: [],
    version: Number,
  }
)

module.exports = mongoose.model('Group', Group);