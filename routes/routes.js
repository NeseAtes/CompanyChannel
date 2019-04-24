var cookieParser = require('cookie-parser');
var BaseController = require("../controllers/BaseController");
var CommentController = require("../controllers/CommentController");
var SubjectController = require("../controllers/SubjectController");
var CompaniesCtrl= require("../controllers/CompaniesController");
var PersonnelsCtrl= require("../controllers/PersonnelsController");
var ElasticSearchCtrl =require("../controllers/ElasticSearchController");
var HomeCtrl= require("../controllers/HomeController");
var TokenCtrl=require("../controllers/TokenController");
var TagCtrl=require("../controllers/TagController");

module.exports = function(app) {
	app.use(cookieParser())
	app.get('/',HomeCtrl.IndexAction);
	app.post('/login',BaseController.InitSession,PersonnelsCtrl.login,BaseController.EndSession);

	app.post('/api/subject',TokenCtrl.tokenControl,BaseController.InitSession,SubjectController.addSubject,BaseController.EndSession);
	app.get('/api/subject',TokenCtrl.tokenControl,BaseController.InitSession,SubjectController.getSubject,BaseController.EndSession);
	app.get('/api/subject/one',TokenCtrl.tokenControl,BaseController.InitSession,SubjectController.getOneSubject,BaseController.EndSession);
	app.get('/api/subject/tag',TokenCtrl.tokenControl,BaseController.InitSession,SubjectController.getSubjectsforTag,BaseController.EndSession);
	app.delete('/api/subject/:subject_ID',TokenCtrl.tokenControl, BaseController.InitSession, SubjectController.deleteSubject, BaseController.EndSession);
	app.get('/api/subject/personnel',TokenCtrl.tokenControl, BaseController.InitSession, SubjectController.getPersonnelSubjects, BaseController.EndSession);
	app.post('/api/subject/solved',TokenCtrl.tokenControl,BaseController.InitSession,SubjectController.solved,BaseController.EndSession);

	app.post('/api/comment',TokenCtrl.tokenControl,BaseController.InitSession,CommentController.addComment,BaseController.EndSession);
	app.get('/api/comment',TokenCtrl.tokenControl,BaseController.InitSession,CommentController.getComment,BaseController.EndSession);
	app.get('/api/comment/personnel',TokenCtrl.tokenControl,BaseController.InitSession,CommentController.getPersonnelComments,BaseController.EndSession);
	app.post('/api/comment/update',TokenCtrl.tokenControl,BaseController.InitSession,CommentController.updateComment,BaseController.EndSession);
	app.delete('/api/comment',TokenCtrl.tokenControl,BaseController.InitSession,CommentController.deleteComment,BaseController.EndSession);

	app.get('/api/companies',TokenCtrl.tokenControl,BaseController.InitSession,CompaniesCtrl.getCompanies,BaseController.EndSession);
	app.post('/api/companies',BaseController.InitSession,CompaniesCtrl.addCompany,BaseController.EndSession);
	app.delete('/api/companies',TokenCtrl.tokenControl,BaseController.InitSession,CompaniesCtrl.deleteCompany,BaseController.EndSession);

	app.get('/api/personnels',TokenCtrl.tokenControl,BaseController.InitSession,PersonnelsCtrl.getPersonnels,BaseController.EndSession);
	app.post('/api/personnels',TokenCtrl.adminControl,BaseController.InitSession,PersonnelsCtrl.addPersonnel,BaseController.EndSession);
	app.post('/api/personnels/password',TokenCtrl.tokenControl,BaseController.InitSession,PersonnelsCtrl.updatePassword,BaseController.EndSession);

	app.post('/api/createIndex',BaseController.InitSession,ElasticSearchCtrl.createIndex,BaseController.EndSession);

	app.post('/api/elastic',TokenCtrl.tokenControl,BaseController.InitSession,ElasticSearchCtrl.search,BaseController.EndSession);
	app.delete('/api/elastic/:_id',TokenCtrl.tokenControl, BaseController.InitSession, ElasticSearchCtrl.deleteDocument, BaseController.EndSession);

	app.post('/api/tags',TokenCtrl.tokenControl,BaseController.InitSession,TagCtrl.addTag,BaseController.EndSession);
	app.get('/api/tags',TokenCtrl.tokenControl,BaseController.InitSession,TagCtrl.getAllTag,BaseController.EndSession);
	app.post('/api/tags/delete',TokenCtrl.tokenControl,BaseController.InitSession,TagCtrl.deleteTag,BaseController.EndSession);

	app.get('/logout',TokenCtrl.tokenControl,BaseController.InitSession,PersonnelsCtrl.logout,BaseController.EndSession);
};