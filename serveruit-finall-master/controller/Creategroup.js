var Creategroup = require('../model/Creategroup');

exports.CreategroupChat = async (req, res, next) => {
    const { data } = req.body;
    const newCreategroup = new Creategroup({
        title:data.title,
        mssv:data.mssv,
    })
    console.log("Create group", newCreategroup.title)
    newCreategroup.save(function(err){
        if(err) throw err;
    })
    // res.json(newCreategroup);
}

exports.getDataGC= async (req, res, next) => {
    Creategroup.find().sort({_id: -1 })
    .exec(function (err, data) {
        if (err) return handleError(err);
        res.json(data);
        // console.log(data);
    })
}

