var cookieParser = require('cookie-parser');
var BaseController = require("../controllers/BaseController");
var CommentController = require("../controllers/CommentController");
var SubjectController = require("../controllers/SubjectController");
var CompaniesCtrl = require("../controllers/CompaniesController");
var PersonnelsCtrl = require("../controllers/PersonnelsController");
var ElasticSearchCtrl = require("../controllers/ElasticSearchController");
var HomeCtrl = require("../controllers/HomeController");
var TokenCtrl = require("../controllers/TokenController");
var TagCtrl = require("../controllers/TagController");
var storages = require("../routes/storages");

var multer = require('multer')
var upload = multer({ storage: storages.storage })
var comment_upload = multer({ storage: storages.comment_storage })
var subject_upload = multer({ storage: storages.subject_storage })

module.exports = function (app) {
	app.use(cookieParser())
	app.get('/', HomeCtrl.IndexAction);
	app.post('/login', BaseController.InitSession, PersonnelsCtrl.login, BaseController.EndSession);

	app.post('/api/subject', TokenCtrl.normalControl, BaseController.InitSession, SubjectController.addSubject, BaseController.EndSession);
	app.get('/api/subject', TokenCtrl.normalControl, BaseController.InitSession, SubjectController.getSubject, BaseController.EndSession);
	app.delete('/api/subject', TokenCtrl.normalControl, BaseController.InitSession, SubjectController.deleteSubject, BaseController.EndSession);
	app.get('/api/subject/one', TokenCtrl.normalControl, BaseController.InitSession, SubjectController.getOneSubject, BaseController.EndSession);
	app.get('/api/subject/tag', TokenCtrl.normalControl, BaseController.InitSession, SubjectController.getSubjectsforTag, BaseController.EndSession);
	app.get('/api/subject/personnel', TokenCtrl.normalControl, BaseController.InitSession, SubjectController.getPersonnelSubjects, BaseController.EndSession);
	app.post('/api/subject/picture', TokenCtrl.normalControl, BaseController.InitSession, subject_upload.single('subject_file'), SubjectController.uploadSubjectPicture, BaseController.EndSession);
	app.delete('/api/subject/picture', TokenCtrl.normalControl, BaseController.InitSession, SubjectController.deleteOneSubjectPicture, BaseController.EndSession);

	app.post('/api/comment', TokenCtrl.normalControl, BaseController.InitSession, CommentController.addComment, BaseController.EndSession);
	app.get('/api/comment', TokenCtrl.normalControl, BaseController.InitSession, CommentController.getComment, BaseController.EndSession);
	app.get('/api/comment/personnel', TokenCtrl.normalControl, BaseController.InitSession, CommentController.getPersonnelComments, BaseController.EndSession);
	app.post('/api/comment/update', TokenCtrl.normalControl, BaseController.InitSession, CommentController.updateComment, BaseController.EndSession);
	app.delete('/api/comment', TokenCtrl.normalControl, BaseController.InitSession, CommentController.deleteComment, BaseController.EndSession);
	app.post('/api/comment/answer', TokenCtrl.normalControl, BaseController.InitSession, CommentController.answer, BaseController.EndSession);
	app.post('/api/comment/picture', TokenCtrl.normalControl, BaseController.InitSession, comment_upload.single('comment_file'), CommentController.uploadCommentPicture, BaseController.EndSession);
	app.delete('/api/comment/picture', TokenCtrl.normalControl, BaseController.InitSession,CommentController.deleteOnePicture, BaseController.EndSession);

	app.get('/api/companies', TokenCtrl.normalControl, BaseController.InitSession, CompaniesCtrl.getCompanies, BaseController.EndSession);
	app.post('/api/companies', BaseController.InitSession, CompaniesCtrl.addCompany, BaseController.EndSession);
	app.delete('/api/companies', TokenCtrl.normalControl, BaseController.InitSession, CompaniesCtrl.deleteCompany, BaseController.EndSession);

	app.get('/api/personnels', TokenCtrl.normalControl, BaseController.InitSession, PersonnelsCtrl.getPersonnels, BaseController.EndSession);
	app.post('/api/personnels', TokenCtrl.adminControl, BaseController.InitSession, PersonnelsCtrl.addPersonnel, BaseController.EndSession);
	app.post('/api/personnels/password', TokenCtrl.normalControl, BaseController.InitSession, PersonnelsCtrl.updatePassword, BaseController.EndSession);

	app.post('/api/personnels/picture', TokenCtrl.normalControl, BaseController.InitSession, upload.single('file'), PersonnelsCtrl.uploadPicture, BaseController.EndSession);

	app.post('/api/createIndex', BaseController.InitSession, ElasticSearchCtrl.createIndex, BaseController.EndSession);

	app.post('/api/elastic', TokenCtrl.normalControl, BaseController.InitSession, ElasticSearchCtrl.search, BaseController.EndSession);
	app.delete('/api/elastic/:_id', TokenCtrl.normalControl, BaseController.InitSession, ElasticSearchCtrl.deleteDocument, BaseController.EndSession);

	app.post('/api/tags', TokenCtrl.normalControl, BaseController.InitSession, TagCtrl.addTag, BaseController.EndSession);
	app.get('/api/tags', TokenCtrl.normalControl, BaseController.InitSession, TagCtrl.getAllTag, BaseController.EndSession);
	app.post('/api/tags/delete', TokenCtrl.normalControl, BaseController.InitSession, TagCtrl.deleteTag, BaseController.EndSession);

	app.get('/logout', TokenCtrl.normalControl, BaseController.InitSession, PersonnelsCtrl.logout, BaseController.EndSession);
};