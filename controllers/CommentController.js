var mainCtrl = require('./MainController');
var moment = require('moment');
var mongodb = require('mongodb');

var addComment = function(req,res,next){
	
	req.body["date"]= moment().format('MMMM Do YYYY, h:mm:ss a');
	req.body["company_ID"]=res.locals.data.data.company_id;
	req.body["personnel_ID"]=res.locals.data.data.personnel_id;
	mainCtrl.addData("comments",req,res,next);
};

var getComment = function(req,res,next){
	var condition={
		subject_ID:req.query.subject_ID
	}	
	mainCtrl.getAll("comments",condition,req,res,next);
};
var getPersonnelComments=function(req,res,next) {
	var condition={personnel_ID:req.query.personnel_ID};
	mainCtrl.getAll("comments",condition,req,res,next);
}
var updateComment=function(req,res,next){ //sadece yorum yapan düzenleyebilir/silebilir
	var condition={
		_id:new mongodb.ObjectId(req.body.comment_ID)
	}
	var connection=res.locals.database;
	connection.collection("comments").findOne(condition,function(err,result){
		if(result.personnel_ID==res.locals.data.data.personnel_id){
			result["comment"]=req.body.new_comment;
			mainCtrl.updateData("comments",condition,result,res,next);
		}
		else{
			res.locals.data={
				data:false
			};
			next();
		}
	});	
}
var deleteComment=function(req,res,next) {
	var condition={
		_id:new mongodb.ObjectId(req.body.comment_ID)
	}
	var connection=res.locals.database;
	connection.collection("comments").findOne(condition,function(err,result){
		if(result.personnel_ID==res.locals.data.data.personnel_id){
			mainCtrl.deleteData("comments",condition,req,res,next);
		}
		else{
			res.locals.data={
				data:false
			};
			next();
		}
	});
}
module.exports.addComment=addComment;
module.exports.getComment=getComment;
module.exports.updateComment=updateComment;
module.exports.deleteComment=deleteComment;
module.exports.getPersonnelComments=getPersonnelComments;