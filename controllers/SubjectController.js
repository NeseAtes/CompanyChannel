var mainCtrl = require('./MainController');
var mongodb = require('mongodb');
var moment = require('moment');

var parseForTag=function(companyid,description) {
	var arr = description.split("#");
	var tagjsons=[];
	arr.shift();
	arr.forEach(element => {
		var a=element.split(' ');
		var tagjson={
			"company_ID":companyid,
			"tag":a[0]
		}
		tagjsons.push(tagjson);
	});
	return tagjsons;
}

var addSubject = function (req, res, next) {//req.tag json gönder
	var companyid=res.locals.data.data.company_id;
	req.body["company_ID"] = companyid;
	req.body["personnel_ID"] = res.locals.data.data.personnel_id;
	req.body["date"] = moment().format('MMMM Do YYYY, h:mm:ss a');
	req.body["onay"] = false;
	req.body["count"] = 0;
	req.body["tags"]=[];

	req.tag=parseForTag(companyid,req.body.description);
	
	mainCtrl.addData("subjects", req, res, next);
};

var getSubject = function (req, res, next) {
	var connection = res.locals.database;
	var company_id = res.locals.data.data.company_id;
	var condition = {
		company_ID: company_id,
		subject_ID: req.query.subject_ID
	}
	connection.collection('subjects').find().limit(5).sort({_id: -1}).toArray(function(err,result){
		if (err) {
			console.log("err",err);
		}
		else{
			res.locals.data={
				data: result
			}
			next();
		}
	});
}
var getOneSubject = function (req, res, next) {
	var company_id = res.locals.data.data.company_id;
	var condition = {
		company_ID: company_id,
		_id: new mongodb.ObjectId(req.query.subject_ID)
	}
	mainCtrl.getAll("subjects", condition, req, res, next);
	var connection = res.locals.database;
	connection.collection("subjects").find(condition).toArray(function (err, result) {
		var newVal = result[0];
		//console.log("1", newVal.count)
		newVal["count"] = newVal.count + 1;
		//console.log(newVal)
		mainCtrl.updateData("subjects", condition, newVal, res, next);
	})
}

var deleteSubject=function(req,res,next){
	var id={_id:new mongodb.ObjectId(req.params.subject_ID)};
	mainCtrl.deleteData("subjects",id,req,res,next);
}

module.exports.addSubject=addSubject;
module.exports.getSubject=getSubject;
module.exports.getOneSubject=getOneSubject;
module.exports.deleteSubject=deleteSubject;