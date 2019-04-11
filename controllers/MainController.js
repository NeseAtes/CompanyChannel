var addData=function(tablename,req,res,next){
    var connection=res.locals.database;
    connection.collection(tablename).insertOne(req.body,function(err,result){
       if(err) throw err;
       res.locals.data={data:true};
       next(); 
    });
}
var getAll=function(tablename,conditions,req,res,next){
    var connection=res.locals.database;
    connection.collection(tablename).find(conditions).toArray(function(err,result) {
        if(err) throw err;
        res.locals.data={data:result};
        next();
    });
}
module.exports.addData=addData;
module.exports.getAll=getAll;