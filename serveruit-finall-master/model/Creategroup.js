const mongoose=require('mongoose');
const mongooseHidden = require('mongoose-hidden')({ defaultHidden: { __v: true } });

const Creategroup=mongoose.Schema(
    { 
        title:String,
        mssv:String,
    }
)

module.exports=mongoose.model('Creategroup',Creategroup);