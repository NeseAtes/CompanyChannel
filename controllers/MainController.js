var esController = require("./ElasticSearchController");
var mongodb = require('mongodb');

var addData=function(tablename,req,res,next){
  var connection=res.locals.database;
  connection.collection(tablename).insertOne(req.body,function(err,result){
    if (err) {
      console.log("error",err)
      next(err);
    }
    else{
      if (tablename=="subjects"){
        req.body.insertId=result._id;
        //console.log("insertId",result.insertedId);
        //console.log("insertId2",req.body.insertId);
        esController.addDocumentInner(req.body,function(err,result){
          console.log("addDocumentInner: ", err, result);
          console.log("req_body",req.body);
          if(err) {
              res.locals.data = {
                  data: false,
                  error: err
              }
              next();
          }else {
              res.locals.data = {
                  data: true
              }
              next();
          }
        });
      }
      res.locals.data={
        data: true
      };
      next();
    } 
  });
}
var getAll=function(tablename,conditions,req,res,next){
    var connection=res.locals.database;
    var myresult=[];
    var count=0;
    connection.collection(tablename).find(conditions).toArray(function(err,result) {
        if(err) throw err;
        myresult=result;
        
    if(tablename=="comments"||tablename=="subjects"){
      myresult.forEach(element => {
        connection.collection("personnels").find({_id:new mongodb.ObjectId(element.personnel_ID)})
        .toArray(function(err,rslt){
          if(err) throw err;
          element["personnel_name"]=rslt[0].personnel_name;
          count++;
          if(count==myresult.length){
            res.locals.data={data:myresult};
            next();
          }
        });
      });
    }
    });
}

module.exports.addData=addData;
module.exports.getAll=getAll;