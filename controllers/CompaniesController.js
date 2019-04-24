var mainCtrl = require("./MainController");
var mongodb = require('mongodb');

var addCompany=function(req,res,next) {
    mainCtrl.addData("companies",req,res,next);
}
var getCompanies=function(req,res,next) {
    mainCtrl.getAll("companies",{},req,res,next);
}
var deleteCompany=function(req,res,next){
    var id={_id:new mongodb.ObjectId(req.query.company_ID)};
    var connection = res.locals.database;
    var company_id={company_ID:req.query.company_ID};

    mainCtrl.deleteData("companies",id,req,res,next);
    
    connection.collection("personnels").deleteMany(company_id);
    connection.collection("subjects").deleteMany(company_id);
    connection.collection("comments").deleteMany(company_id);
    connection.collection("tags").deleteMany(company_id);

}
module.exports.addCompany=addCompany;
module.exports.getCompanies=getCompanies;
module.exports.deleteCompany=deleteCompany;