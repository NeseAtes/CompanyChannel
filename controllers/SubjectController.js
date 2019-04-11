var mainCtrl = require('./MainController');

var addSubject = function(req,res,next){
	req.body["date"] = Date();
	console.log(req.body.date);
	req.body["onay"] = false;
	mainCtrl.addData("subjects",req,res,next);
};

var getSubject = function(req,res,next){
	mainCtrl.getAll("subjects",{},req,res,next);
};

module.exports.addSubject=addSubject;
module.exports.getSubject=getSubject;