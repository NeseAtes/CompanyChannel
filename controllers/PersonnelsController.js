var mainCtrl = require("./MainController");
var tokenCtrl = require("./TokenController");
var bcrypt = require('bcrypt');
var mongodb = require('mongodb');

var addPersonnel = function (req, res, next) {
    req.body["company_ID"]=res.locals.data.data.company_id;
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        req.body.password = hash;
        mainCtrl.addData("personnels", req, res, next);
    });
}
var getPersonnels = function (req, res, next) {
    var company_id = res.locals.data.data.company_id;
    var conditions={
        company_ID: company_id
    }
    if(req.query.personnel_ID!=undefined)
        conditions["_id"]=new mongodb.ObjectId(req.query.personnel_ID)

    mainCtrl.getAll("personnels", conditions, req, res, next);
}
var login = function (req, res, next) {
    var connection = res.locals.database;
    connection.collection("personnels").findOne({ email: req.body.email }, function (err, result) {
        console.log(result)

        if (err) throw err;
        else if (result != null) {
            bcrypt.compare(req.body.password, result.password, function (err, reslt) {
                if (reslt) {
                    var personnel = {
                        personnel_id: result._id,
                        company_id: result.company_ID
                    };
                    var token = tokenCtrl.token(personnel);
                    res.cookie('auth', token);
                    res.locals.data = {
                        data: token,
                        is_admin: result.role == "admin" ? true : false,
                        is_user: true
                    };
                    next();
                }
                else {
                    return res.send({ is_user: false, message: 'Please check the information' });
                }
            });
        }        
        else{
            res.locals.data={
                is_user:false
            }
            next();
        }
    });
}
var logout = function (req, res, next) {
    res.clearCookie('auth');
    res.send({ message: 'session closed' })
}
module.exports.addPersonnel = addPersonnel;
module.exports.getPersonnels = getPersonnels;
module.exports.login = login;
module.exports.logout = logout;