var jwt = require('jsonwebtoken');
var token= function(data){
    var token = jwt.sign(data, 'companykey');   //private key=> companykey
    //{expiresIn: 30}
    return {token:token}
  }
  var tokenControl=function(req, res,next) {
    if(req.cookies.auth!=undefined){
      var token = req.cookies.auth.token;
      if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
          
      jwt.verify(token, 'companykey', function(err, decoded) {
      if (err) {
        res.clearCookie("auth");
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      }
        res.locals.data={auth:true,data:decoded};
        next();
      });
    }
    else{
      return res.status(503).send({message:'Api not connected'});
    }
  }
  module.exports.token=token;
  module.exports.tokenControl=tokenControl;