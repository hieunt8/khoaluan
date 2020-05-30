const mongoose=require('mongoose');
const mongooseHidden = require('mongoose-hidden')({ defaultHidden: { __v: true } });

const Chat=mongoose.Schema(
    { 
        data:String,
        time:String,
    }
)

module.exports=mongoose.model('Chat',Chat);