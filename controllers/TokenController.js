var jwt = require('jsonwebtoken');
var token = function (data) {
  var token = jwt.sign(data, 'companykey');   //private key=> companykey
  //{expiresIn: 30}
  return { token: token }
}

var tokenControl = function (req, res, next, role) {
  if (req.cookies.auth != undefined) {
    var token = req.cookies.auth;
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, 'companykey', function (err, decoded) {
      if (err) {
        res.clearCookie("auth");
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      }
      if (role == "admin") {
        if (decoded.role == "admin") {
          res.locals.data = { auth: true, data: decoded };
          next();
        }
        else {
          return res.status(500).send({ auth: false, message: 'You are not authorized to access the page.' });
        }
      }
      else {
        res.locals.data = { auth: true, data: decoded };
        next();
      }
    });
  } else {
    return res.status(503).send({ message: 'Database not connected' });
  }
}
var normalControl = function (req, res, next) {
  tokenControl(req, res, next, "normal");
}
var adminControl = function (req, res, next) {
  tokenControl(req, res, next, "admin");
}
module.exports.token = token;
module.exports.normalControl = normalControl;
module.exports.adminControl = adminControl;