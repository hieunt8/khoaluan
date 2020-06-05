const mongoose=require('mongoose');
const mongooseHidden = require('mongoose-hidden')({ defaultHidden: { __v: true } });

const Group=mongoose.Schema(
    { 
        title:{ type : String , unique : true, required : true, dropDups: true },
        mssv:String,
    }
)

module.exports=mongoose.model('Group',Group);