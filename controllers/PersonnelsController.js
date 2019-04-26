var mainCtrl = require("./MainController");
var tokenCtrl = require("./TokenController");
var bcrypt = require('bcrypt');
var mongodb = require('mongodb');

var addPersonnel = function (req, res, next) {
    req.body["company_ID"] = res.locals.data.data.company_id;
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if(err) throw err;
        req.body.password = hash;
        var connection = res.locals.database;
        var conditions = {
            email: req.body.email,
            personnel_name: req.body.personnel_name
        }
        connection.collection("personnels").findOne(conditions, function (err, result) {
            if (err) throw err;
            if (result == null) {
                mainCtrl.addData("personnels", req, res, next);
            }
            else {
                res.locals.data = {
                    data: false,
                    message: "this personnel is already saved"
                }
                next();
            }
        });
    });
}
var getPersonnels = function (req, res, next) {
    var company_id = res.locals.data.data.company_id;
    var conditions = {
        company_ID: company_id
    }
    if (req.query.personnel_ID != undefined)
        conditions["_id"] = new mongodb.ObjectId(req.query.personnel_ID)

    mainCtrl.getAll("personnels", conditions, req, res, next);
}
var updatePassword = function (req, res, next) {
    var connection = res.locals.database;
    var condition={_id:new mongodb.ObjectId(req.body.personnel_ID)}
    if(req.body.personnel_ID==res.locals.data.data.personnel_id){
        connection.collection("personnels").findOne(condition,function(err,result){
            if(err) throw err;
            bcrypt.hash(req.body.newPassword,10,function(err,hash){
                if(err) throw err;
                result["password"]=hash;
                mainCtrl.updateData("personnels",condition,result,res,next);
            });
        });
    }else{
        res.locals.data={
            data:false
        };
        next();
    }
}
var login = function (req, res, next) {
    var connection = res.locals.database;
    connection.collection("personnels").findOne({ email: req.body.email }, function (err, result) {
        if (err) throw err;
        else if (result != null) {
            bcrypt.compare(req.body.password, result.password, function (err, reslt) {
                if (reslt) {
                    var personnel = {
                        personnel_id: result._id,
                        company_id: result.company_ID,
                        role: result.role
                    };
                    var token = tokenCtrl.token(personnel);
                    res.cookie('auth', token);
                    res.locals.data = {
                        data: token,
                        is_id:result._id,
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
        else {
            res.locals.data = {
                is_user: false
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
module.exports.updatePassword = updatePassword;