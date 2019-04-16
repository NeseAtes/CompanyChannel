var mainCtrl = require('./MainController');
var mongodb = require('mongodb');

var addSubject = function(req,res,next){
	req.body["company_ID"]=res.locals.data.data.company_id;
	req.body["personnel_ID"]=res.locals.data.data.personnel_id;
	req.body["date"] = Date();
	req.body["onay"] = false;
	mainCtrl.addData("subjects",req,res,next);
};

var getSubject = function(req,res,next){
	var company_id=res.locals.data.data.company_id;
	var condition={
		company_ID:company_id,
		subject_ID:req.query.subject_ID
	}
	mainCtrl.getAll("subjects",condition,req,res,next);
};
var getOneSubject=function(req,res,next) {
	var company_id=res.locals.data.data.company_id;
	var condition={
		company_ID:company_id,
		_id:new mongodb.ObjectId(req.query.subject_ID)
	}
	mainCtrl.getAll("subjects",condition,req,res,next);
	var connection=res.locals.database;
	connection.collection("subjects").find(condition).toArray(function(err,result){
		var newVal=result[0];
		console.log("1",newVal.count)
		newVal["count"]=newVal.count+1;
		console.log(newVal)
		mainCtrl.updateData("subjects",condition,newVal,res,next);
	})
}

module.exports.addSubject=addSubject;
module.exports.getSubject=getSubject;
module.exports.getOneSubject=getOneSubject;