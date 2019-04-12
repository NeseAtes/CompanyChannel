var mainCtrl = require('./MainController');

var addSubject = function(req,res,next){
	req.body["company_ID"]=res.locals.data.data.company_id;
	req.body["personnel_ID"]=res.locals.data.data.personnel_id;
	req.body["date"] = Date();
	req.body["onay"] = false;
	mainCtrl.addData("subjects",req,res,next);
};

var getSubject = function(req,res,next){
	var company_id=res.locals.data.data.company_id;
	mainCtrl.getAll("subjects",{company_ID:company_id},req,res,next);
};

module.exports.addSubject=addSubject;
module.exports.getSubject=getSubject;