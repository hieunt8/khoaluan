const mongoose=require('mongoose');
const mongooseHidden = require('mongoose-hidden')({ defaultHidden: { __v: true } });

const Schedule=mongoose.Schema(
    {
        day:String,
        subject_code:String,
        subject_name:String,
        teacher_name:String,
        room:String,
        start_day:String,
        end_day:String,
        student_id:Number
    }
)

module.exports=mongoose.model('Schedule',Schedule);
