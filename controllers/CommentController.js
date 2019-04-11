var mainCtrl = require('./MainController');

var addComment = function(req,res,next){
	
	req.body["date"]= Date();
	//var subject_ID = res.locals.data.data.subject_id;
	mainCtrl.addData("comments",req,res,next);
};

var getComment = function(req,res,next){
	mainCtrl.getAll("comments",{},req,res,next);
};

module.exports.addComment=addComment;
module.exports.getComment=getComment;