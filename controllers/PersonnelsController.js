var mainCtrl = require("./MainController");
var tokenCtrl = require("./TokenController");
var bcrypt = require('bcrypt');
var addPersonnel=function(req,res,next) {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        req.body.password=hash;
        mainCtrl.addData("personnels",req,res,next);
    });
}
var getPersonnels=function(req,res,next){
    mainCtrl.getAll("personnels",{},req,res,next);
}
var login=function(req,res,next){
    var connection=res.locals.database;
    connection.collection("personnels").findOne({email:req.body.email},function(err,result){
        if (err) throw err;
        else if(result!=null){
            bcrypt.compare(req.body.password, result.password, function(err, reslt) {
                if(reslt){
                    var personnelid={
                        personnel_id:result._id
                    };
                    var token=tokenCtrl.token(personnelid);
                    res.cookie('auth',token);
                    res.locals.data={
                        data:token
                    };
                    next();
                }
                else{
                    return res.send({is_user:false,message: 'Please check the information' });
                }
            });
        }
    });
}
var logout=function(req,res,next) {
    res.clearCookie('auth');
    res.send({message:'session closed'})
}
module.exports.addPersonnel=addPersonnel;
module.exports.getPersonnels=getPersonnels;
module.exports.login=login;
module.exports.logout=logout;