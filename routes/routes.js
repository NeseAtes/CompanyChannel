var cookieParser = require('cookie-parser')
var CompaniesCtrl= require("../controllers/CompaniesController");
var PersonnelsCtrl= require("../controllers/PersonnelsController");
var BaseController=require("../controllers/BaseController");
module.exports = function(app) {
	app.use(cookieParser())
	app.get('/api/companies',BaseController.InitSession,CompaniesCtrl.getCompanies,BaseController.EndSession);
	app.post('/api/companies',BaseController.InitSession,CompaniesCtrl.addCompany,BaseController.EndSession);
	app.get('/api/personnels',BaseController.InitSession,PersonnelsCtrl.getPersonnels,BaseController.EndSession);
	app.post('/api/personnels',BaseController.InitSession,PersonnelsCtrl.addPersonnel,BaseController.EndSession);
};