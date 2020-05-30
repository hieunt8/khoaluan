const mongoose=require('mongoose');
const mongooseHidden = require('mongoose-hidden')({ defaultHidden: { __v: true } });

const Post=mongoose.Schema(
    { 
        name:String,
        student_id:Number,
        rating:String,
        content:String,
        time:String,
    }
)

module.exports=mongoose.model('Post',Post);