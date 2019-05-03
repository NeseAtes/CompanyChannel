var mainCtrl = require('./MainController');
var fileCtrl = require('./FileController');
var moment = require('moment');
var mongodb = require('mongodb');

var addComment = function (req, res, next) {

	req.body["date"] = moment().format('MMMM Do YYYY, h:mm:ss a');
	req.body["company_ID"] = res.locals.data.data.company_id;
	req.body["personnel_ID"] = res.locals.data.data.personnel_id;
	req.body["is_answer"] = false;
	req.body["picture_paths"] = [];
	mainCtrl.addData("comments", req, res, next);
};
var answer = function (req, res, next) {
	var connection = res.locals.database;
	var comment_id = req.body.comment_ID;
	var present_personnel = res.locals.data.data.personnel_id;
	var condition = {
		_id: new mongodb.ObjectId(comment_id)
	};
	connection.collection("comments").findOne(condition, function (err, result) {
		if (err) throw err;
		var subject_id = { _id: new mongodb.ObjectId(result.subject_ID) };
		connection.collection("subjects").findOne(subject_id, function (err1, rslt) {
			if (err1) throw err1;
			if (present_personnel == rslt.personnel_ID) {
				//rslt.isOk = rslt.isOk==true?false:true;
				result.is_answer = result.is_answer == true ? false : true;
				if (result.is_answer && !rslt.isOk) {
					rslt.isOk = true;
					connection.collection("subjects").update(subject_id, rslt);
				}
				else if (!result.is_answer) {
					connection.collection("comments").find({ is_answer: true }).count(function (err, count) {
						if (count == 1) {
							rslt.isOk = false;
							connection.collection("subjects").update(subject_id, rslt);
						}
					});
				}
				connection.collection("comments").update(condition, result);

				res.locals.data = { data: true };
				next();
			}
			else {
				res.locals.data = { data: false };
				next();
			}
		});
	});
}
var uploadCommentPicture = function (req, res, next) {
	req.body["id"] = req.body.comment_ID;
	fileCtrl.uploadFile(req, res, next, "comments");
};
var deleteOnePicture = function (req, res, next) {
	var path = req.query.path;
	var condition = {
		_id: new mongodb.ObjectId(req.query.comment_ID)
	}
	fileCtrl.deleteOneFile(res, next, "comments", path, condition);
}
var getComment = function (req, res, next) {
	var condition = {
		subject_ID: req.query.subject_ID
	}
	mainCtrl.getAll("comments", condition, req, res, next);
};
var getPersonnelComments = function (req, res, next) {
	var condition = { personnel_ID: req.query.personnel_ID };
	mainCtrl.getAll("comments", condition, req, res, next);
}
var updateComment = function (req, res, next) { //sadece yorum yapan düzenleyebilir/silebilir
	var condition = {
		_id: new mongodb.ObjectId(req.body.comment_ID)
	}
	var connection = res.locals.database;
	connection.collection("comments").findOne(condition, function (err, result) {
		if (result.personnel_ID == res.locals.data.data.personnel_id) {
			result["comment"] = req.body.new_comment;
			mainCtrl.updateData("comments", condition, result, res, next);
		}
		else {
			res.locals.data = {
				data: false
			};
			next();
		}
	});
}
var deleteComment = function (req, res, next) {
	var condition = {
		_id: new mongodb.ObjectId(req.query.comment_ID)
	}
	var connection = res.locals.database;
	connection.collection("comments").findOne(condition, function (err, result) {

		var personnel_id = { _id: new mongodb.ObjectId(result.personnel_ID) }
		connection.collection("personnels").findOne(personnel_id, function (err, result) {
			if (err) throw err;
			if (result != null) {
				result.comment_count = result.comment_count - 1;
				connection.collection("personnels").update(personnel_id, result);
			}
		});

		if (result.personnel_ID == res.locals.data.data.personnel_id) {
			fileCtrl.deleteFile("comments", condition, res);
			mainCtrl.deleteData("comments", condition, req, res, next);
			next();
		}
		else {
			res.locals.data = {
				data: false
			};
			next();
		}
	});
}
module.exports.addComment = addComment;
module.exports.getComment = getComment;
module.exports.updateComment = updateComment;
module.exports.deleteComment = deleteComment;
module.exports.getPersonnelComments = getPersonnelComments;
module.exports.answer = answer;
module.exports.uploadCommentPicture = uploadCommentPicture;
module.exports.deleteOnePicture = deleteOnePicture;