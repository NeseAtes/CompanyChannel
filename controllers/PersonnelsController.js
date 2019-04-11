var mainCtrl = require("./MainController");
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
module.exports.addPersonnel=addPersonnel;
module.exports.getPersonnels=getPersonnels;