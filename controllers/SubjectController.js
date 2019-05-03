var mainCtrl = require('./MainController');
var mongodb = require('mongodb');
var moment = require('moment');
var tagCtrl = require("./TagController");
var fileCtrl = require('./FileController');

var parseForTag = function (companyid, description) {
	var arr = description.split(" #");
	var tagjsons = [];
	arr.shift();
	arr.forEach(element => {
		var a = element.split(' ');
		var tagjson = {
			"company_ID": companyid,
			"tag": a[0]
		}
		tagjsons.push(tagjson);
	});
	return tagjsons;
}

var addSubject = function (req, res, next) {//req.tag json gönder
	var companyid = res.locals.data.data.company_id;
	req.body["company_ID"] = companyid;
	req.body["personnel_ID"] = res.locals.data.data.personnel_id;
	req.body["date"] = moment().format('MMMM Do YYYY, h:mm:ss a');
	req.body["isOk"] = false;
	req.body["count"] = 0;
	req.body["tags"] = [];
	req.body["picture_paths"] = [];

	req.tag = parseForTag(companyid, req.body.description);

	mainCtrl.addData("subjects", req, res, next);
};

var getSubject = function (req, res, next) {
	var connection = res.locals.database;
	var company_id = res.locals.data.data.company_id;
	var condition = {
		company_ID: company_id
	}
	connection.collection('subjects').find(condition).limit(5).sort({ _id: -1 }).toArray(function (err, result) {
		if (err) {
			console.log("err", err);
		}
		else {
			res.locals.data = {
				data: result
			}
			next();
		}
	});
}
var getPersonnelSubjects = function (req, res, next) {
	var condition = {
		company_ID: res.locals.data.data.company_id,
		personnel_ID: req.query.personnel_ID
	}
	mainCtrl.getAll("subjects", condition, req, res, next);
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
		newVal["count"] = newVal.count + 1;

		mainCtrl.updateData("subjects", condition, newVal, res, next);
	})
}
var getSubjectsforTag = function (req, res, next) {
	var company_id = res.locals.data.data.company_id;
	var condition = {
		company_ID: company_id,
		tags: req.query.tag
	}
	mainCtrl.getAll("subjects", condition, req, res, next);
}
var uploadSubjectPicture = function (req, res, next) {
	req.body["id"] = req.body.subject_ID;
	fileCtrl.uploadFile(req, res, next, "subjects");
}
var deleteOneSubjectPicture = function (req, res, next) {
	var path = req.query.path;
	var condition = {
		_id: new mongodb.ObjectId(req.query.subject_ID)
	}

	fileCtrl.deleteOneFile(res, next,"subjects", path, condition);
}

var deleteSubject = function (req, res, next) {
	var id = { _id: new mongodb.ObjectId(req.query.subject_ID) };
	var connection = res.locals.database;

	connection.collection("subjects").findOne(id, function (err, result) {
		if (err) throw err;
		if (result != null) {
			var tags = result.tags;
			tagCtrl.deleteTag(tags, res);
		}
	});
	fileCtrl.deleteFile("subjects", id, res);
	mainCtrl.deleteData("subjects", id, req, res, next);
	connection.collection("comments").deleteMany({ subject_ID: req.params.subject_ID });
}

module.exports.addSubject = addSubject;
module.exports.getSubject = getSubject;
module.exports.getOneSubject = getOneSubject;
module.exports.deleteSubject = deleteSubject;
module.exports.getPersonnelSubjects = getPersonnelSubjects;
module.exports.getSubjectsforTag = getSubjectsforTag;
module.exports.uploadSubjectPicture = uploadSubjectPicture;
module.exports.deleteOneSubjectPicture = deleteOneSubjectPicture;