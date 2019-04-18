var mainCtrl = require('./MainController');
var moment = require('moment');

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

module.exports.addComment=addComment;
module.exports.getComment=getComment;