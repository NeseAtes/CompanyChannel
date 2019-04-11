var cookieParser = require('cookie-parser')
var CompaniesCtrl= require("../controllers/CompaniesController");
var PersonnelsCtrl= require("../controllers/PersonnelsController");
var BaseController=require("../controllers/BaseController");
var TokenCtrl=require("../controllers/TokenController");
module.exports = function(app) {
	app.use(cookieParser())
	app.post('/login',BaseController.InitSession,PersonnelsCtrl.login,BaseController.EndSession);
	app.get('/api/companies',TokenCtrl.tokenControl,BaseController.InitSession,CompaniesCtrl.getCompanies,BaseController.EndSession);
	app.post('/api/companies',TokenCtrl.tokenControl,BaseController.InitSession,CompaniesCtrl.addCompany,BaseController.EndSession);
	app.get('/api/personnels',TokenCtrl.tokenControl,BaseController.InitSession,PersonnelsCtrl.getPersonnels,BaseController.EndSession);
	app.post('/api/personnels',TokenCtrl.tokenControl,BaseController.InitSession,PersonnelsCtrl.addPersonnel,BaseController.EndSession);
	app.get('/logout',BaseController.InitSession,PersonnelsCtrl.logout,BaseController.EndSession);
};