var mainCtrl = require("./MainController");
var mongodb = require('mongodb');

var addTag = function (req, res, next) {
    req.body["company_ID"] = res.locals.data.data.company_id;
    mainCtrl.addData("tags", req, res, next);    
}
var getAllTag=function(req,res,next){
    var condition={company_ID:res.locals.data.data.company_id}
    mainCtrl.getAll('tags',condition,req,res,next)
}
var isExist_tag=function(subject,tag,res,next) {
    var connection=res.locals.database;
    connection.collection('tags').findOne(tag,function(err,result) {
        if(err) throw err;
        var qData={_id:new mongodb.ObjectId(subject._id)};
        if(result==null){
            connection.collection("tags").insertOne(tag,function(err,rslt){
                if(err) throw err;
                console.log("1",rslt.ops[0])
                subject.tags.push(rslt.ops[0].tag);
                mainCtrl.updateData("subjects",qData,subject,res,next);
            });
        }else{
            subject.tags.push(result._id);
            mainCtrl.updateData("subjects",qData,subject,res,next);
        }
    });
}
module.exports.addTag=addTag;
module.exports.getAllTag=getAllTag;
module.exports.isExist_tag=isExist_tag;