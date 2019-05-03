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
	app.post('/login', BaseController.InitSession,PersonnelsCtrl.login,BaseController.EndSession);
	app.get('/logout',BaseController.InitSession, PersonnelsCtrl.logout,BaseController.EndSession);

	app.all('/api/base/*', BaseController.InitSession)//init

	app.post('/api/base/companies', CompaniesCtrl.addCompany);
	app.post('/api/base/createIndex', ElasticSearchCtrl.createIndex);

	app.all('/api/base/*', BaseController.EndSession)//init end

	app.all('/api/admin/*', TokenCtrl.adminControl, BaseController.InitSession)//admin

	app.post('/api/admin/personnels', PersonnelsCtrl.addPersonnel);

	app.all('/api/admin/*', BaseController.EndSession)//admin end

	app.all('/api/*', TokenCtrl.normalControl, BaseController.InitSession)//normal

	app.get('/api/subject', SubjectController.getSubject);
	app.get('/api/subject/one', SubjectController.getOneSubject);
	app.get('/api/subject/tag', SubjectController.getSubjectsforTag);
	app.get('/api/subject/personnel', SubjectController.getPersonnelSubjects);

	app.post('/api/subject', SubjectController.addSubject);
	app.post('/api/subject/picture', subject_upload.single('subject_file'), SubjectController.uploadSubjectPicture);

	app.delete('/api/subject', SubjectController.deleteSubject);
	app.delete('/api/subject/picture', SubjectController.deleteOneSubjectPicture);

	app.get('/api/comment', CommentController.getComment);
	app.get('/api/comment/personnel', CommentController.getPersonnelComments);

	app.post('/api/comment', CommentController.addComment);
	app.post('/api/comment/update', CommentController.updateComment);
	app.post('/api/comment/answer', CommentController.answer);
	app.post('/api/comment/picture', comment_upload.single('comment_file'), CommentController.uploadCommentPicture);

	app.delete('/api/comment', CommentController.deleteComment);
	app.delete('/api/comment/picture', CommentController.deleteOnePicture);

	app.get('/api/companies', CompaniesCtrl.getCompanies);
	app.delete('/api/companies', CompaniesCtrl.deleteCompany);

	app.get('/api/personnels', PersonnelsCtrl.getPersonnels);
	app.post('/api/personnels/password', PersonnelsCtrl.updatePassword);
	app.post('/api/personnels/picture', upload.single('file'), PersonnelsCtrl.uploadPicture);

	app.post('/api/elastic', ElasticSearchCtrl.search);
	app.delete('/api/elastic/:_id', ElasticSearchCtrl.deleteDocument);

	app.get('/api/tags', TagCtrl.getAllTag);
	app.post('/api/tags', TagCtrl.addTag);
	app.post('/api/tags/delete', TagCtrl.deleteTag);

	app.all('/api/*', BaseController.EndSession) //normal end
}