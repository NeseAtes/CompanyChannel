var cookieParser = require('cookie-parser');
var BaseController = require("../controllers/BaseController");
var CommentController = require("../controllers/CommentController");
var SubjectController = require("../controllers/SubjectController");
var CompaniesCtrl= require("../controllers/CompaniesController");
var PersonnelsCtrl= require("../controllers/PersonnelsController");
var TokenCtrl=require("../controllers/TokenController");

module.exports = function(app) {
	app.use(cookieParser())

	app.post('/login',BaseController.InitSession,PersonnelsCtrl.login,BaseController.EndSession);

	app.post('/api/subject',BaseController.InitSession,SubjectController.addSubject,BaseController.EndSession);
	app.get('/api/subject',BaseController.InitSession,SubjectController.getSubject,BaseController.EndSession);

	app.post('/api/comment',BaseController.InitSession,CommentController.addComment,BaseController.EndSession);
	app.get('/api/comment',BaseController.InitSession,CommentController.getComment,BaseController.EndSession);
	
	app.get('/api/companies',BaseController.InitSession,CompaniesCtrl.getCompanies,BaseController.EndSession);
	app.post('/api/companies',BaseController.InitSession,CompaniesCtrl.addCompany,BaseController.EndSession);

	app.get('/api/personnels',BaseController.InitSession,PersonnelsCtrl.getPersonnels,BaseController.EndSession);
	app.post('/api/personnels',BaseController.InitSession,PersonnelsCtrl.addPersonnel,BaseController.EndSession);

	app.get('/logout',BaseController.InitSession,PersonnelsCtrl.logout,BaseController.EndSession);
};