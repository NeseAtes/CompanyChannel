var mainCtrl = require("./MainController");
var addCompany=function(req,res,next) {
    mainCtrl.addData("companies",req,res,next);
}
var getCompanies=function(req,res,next) {
    mainCtrl.getAll("companies",req,res,next);
}
module.exports.addCompany=addCompany;
module.exports.getCompanies=getCompanies;