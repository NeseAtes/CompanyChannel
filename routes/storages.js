var multer = require('multer')
var upload = multer({ dest: 'public/uploads/' })
var comment_upload=multer({ dest: 'public/uploads/comment' })
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
module.exports.storage=storage;
module.exports.comment_storage=comment_storage;