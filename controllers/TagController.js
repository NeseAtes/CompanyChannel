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
            tag["count"]=1;
            connection.collection("tags").insertOne(tag,function(err,rslt){
                if(err) throw err;
                subject.tags.push(rslt.ops[0].tag);
                mainCtrl.updateData("subjects",qData,subject,res,next);
            });
        }else{
            if(!subject.tags.includes(result.tag))
                subject.tags.push(result.tag);
            result["count"]=result.count+1;
            mainCtrl.updateData("tags",{tag:result.tag},result,res,next);
            mainCtrl.updateData("subjects",qData,subject,res,next);
        }
    });
}
var deleteTag=function(tags,res) {
    var connection=res.locals.database;
    tags.forEach(element => {
        var condition={tag:element};
        connection.collection("tags").findOne(condition,function(err,result) {
            if(result.count==1){
                connection.collection("tags").deleteOne(condition);
            }else{
                result["count"]=result.count-1;
                connection.collection("tags").update(condition,result);
            }
        });
    });
}
module.exports.addTag=addTag;
module.exports.getAllTag=getAllTag;
module.exports.isExist_tag=isExist_tag;
module.exports.deleteTag=deleteTag;