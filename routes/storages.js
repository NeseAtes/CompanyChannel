var multer = require('multer')
var upload = multer({ dest: 'public/uploads/' })
var comment_upload=multer({ dest: 'public/uploads/comment' })
var subject_upload=multer({ dest: 'public/uploads/subject' })

// SET STORAGE
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/uploads/')
	},
	filename: function (req, file, cb) {
		var now = Date.now();
		cb(null, '-' + now)
	}
})
var comment_storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/uploads/comment')
	},
	filename: function (req, file, cb) {
		var now = Date.now();
		cb(null, '-' + now)
	}
})
var subject_storage=multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/uploads/subject')
	},
	filename: function (req, file, cb) {
		var now = Date.now();
		cb(null, '-' + now)
	}
})
module.exports.storage=storage;
module.exports.comment_storage=comment_storage;
module.exports.subject_storage=subject_storage;