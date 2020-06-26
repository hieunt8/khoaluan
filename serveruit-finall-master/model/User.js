const mongoose=require('mongoose');
const mongooseHidden = require('mongoose-hidden')({ defaultHidden: { __v: true } });

const User=mongoose.Schema(
    { 
        name:String,
        mssv:String,
        publicKey:String,
    }
)

module.exports=mongoose.model('User',User);