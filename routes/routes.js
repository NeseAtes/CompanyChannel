var cookieParser = require('cookie-parser');
var BaseController = require("../controllers/BaseController");
var CommentController = require("../controllers/CommentController");
var SubjectController = require("../controllers/SubjectController");
module.exports = function(app) {
	app.use(cookieParser())

	app.post('/api/subject',BaseController.InitSession,SubjectController.addSubject,BaseController.EndSession);
	app.get('/api/subject',BaseController.InitSession,SubjectController.getSubject,BaseController.EndSession);

	app.post('/api/comment',BaseController.InitSession,CommentController.addComment,BaseController.EndSession);
	app.get('/api/comment',BaseController.InitSession,CommentController.getComment,BaseController.EndSession);
	
};