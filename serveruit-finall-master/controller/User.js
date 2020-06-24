var User = require('../model/User');

exports.Createnewuser = async (req, res, next) => {
    const { data } = req.body;
    const newUser = new User({
        name:data.password,
        mssv:data.username,
        publickey:data.publickey,
    })
    form = {
        "username": data.username,
        "password": data.password,
        flag:true,
        checkexist:false,
    }
    // console.log("Create user", newUser)
    User.find({ mssv: data.username })
    .exec(function (err, data) {
        if (err) return handleError(err);
        if (!data.length)
        {
            newUser.save(function(err){
                if(err) throw err;
                form.flag = true;
            })
        }
        else form.checkexist = true;
        res.json(form);
        console.log(form);
    })  
}


exports.requestUserInfo = async (req, res, next) => {
  const { data } = req.body;
  User.find({mssv: {$in: data.listMssv}}).sort({ _id: -1 })
    .exec(function (err, data) {
      if (err) return handleError(err);
      res.json(data);
    })
}