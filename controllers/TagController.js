var mainCtrl = require("./MainController");
var addTag = function (req, res, next) {
    req.body["company_ID"] = res.locals.data.data.company_id;
    mainCtrl.addData("tags", req, res, next);    
}
var getAllTag=function(req,res,next){
    var condition={company_ID:res.locals.data.data.company_id}
    mainCtrl.getAll('tags',condition,req,res,next)
}
var isExist_tag=function(req,res) {
    var connection=res.locals.database;
    connection.collection('tags').findOne(req.body,function(err,result) {
        if(err) throw err;
        return result==null?false:true;
    });
}
module.exports.addTag=addTag;
module.exports.getAllTag=getAllTag;
module.exports.isExist_tag=isExist_tag;