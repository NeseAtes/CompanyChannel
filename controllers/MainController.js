var esController = require("./ElasticSearchController");
var tagCtrl = require("./TagController");
var mongodb = require('mongodb');
var bcrypt = require('bcrypt');


var addData = function (tablename, req, res, next) {
  var connection = res.locals.database;
  connection.collection(tablename).insertOne(req.body, function (err, result) {
    if (err) {
      console.log("error", err)
      next(err);
    }
    else {
      addingOperations(tablename, result, req, res, next);
      res.locals.data = {
        data: true
      };
      next();
    }
  });
}
var addingOperations = function (tablename, result, req, res, next) {
  var connection = res.locals.database;
  if (tablename == "subjects") {
    req.tag.forEach(element => {
      tagCtrl.isExist_tag(result.ops[0], element, res, next);
    });

    esController.addDocumentInner(req.body, function (err, result) {
      console.log("addDocumentInner: ", err, result);
      console.log("req_body", req.body);
      if (err) {
        res.locals.data = {
          data: false,
          error: err
        }
        next();
      } else {
        res.locals.data = {
          data: true
        }
        next();
      }
    });
  }
  if (tablename == "companies") {
    var company_name = req.body.company_name;
    var user = {
      role: "admin",
      email: company_name + "@" + company_name + ".com",
      personnel_name: company_name,
      company_ID: result.insertedId.toString(),
      picture_path: "uploads\\user.png",
      subject_count:0,
      comment_count:0
    }
    bcrypt.hash(company_name, 10, function (err, hash) {
      if (err) throw err;
      user["password"] = hash;
      connection.collection("personnels").insertOne(user);
    });
  }
  if (tablename == "subjects" || tablename == "comments") {
    var personnel_id = { _id: new mongodb.ObjectId(req.body.personnel_ID) }
    connection.collection("personnels").findOne(personnel_id, function (err, result) {
      if (err) throw err;
      if (result != null) {
        if (tablename == "subjects")
          result.subject_count = result.subject_count + 1;
        else
          result.comment_count = result.comment_count + 1;
        console.log("myres",result)
        connection.collection("personnels").update(personnel_id, result);
      }
    });
  }
}
var getAll = function (tablename, conditions, req, res, next) {
  var connection = res.locals.database;
  var myresult = [];
  var count = 0;

  connection.collection(tablename).find(conditions).toArray(function (err, result) {
    if (err) throw err;
    myresult = result;
    if ((tablename == "comments" || tablename == "subjects") && result.length != 0) {
      myresult.forEach(element => {
        if (tablename == "comments") {
          connection.collection("subjects").find({ _id: new mongodb.ObjectId(element.subject_ID) })
            .toArray(function (err, subresult) {
              if (err) throw err;
              if (subresult != 0) {
                element["subject"] = subresult[0].subject;
                element["count"] = subresult[0].count;
              }

            });
        }
        connection.collection("personnels").find({ _id: new mongodb.ObjectId(element.personnel_ID) })
          .toArray(function (err, rslt) {
            if (err) throw err;
            element["personnel_name"] = rslt[0].personnel_name;
            count++;
            if (count == myresult.length) {
              res.locals.data = { data: myresult };
              next();
            }
          });
      });
    }
    else {
      res.locals.data = { data: myresult };
      next();
    }
  });
}
var updateData = function (tablename, query, newVal, res, next) {
  var connection = res.locals.database;
  connection.collection(tablename).update(query, newVal, function (err, result) {
    if (err) throw err;
    else {
      res.locals.data = {
        data: true
      };
      next();
    }
  });
}

var deleteData = function (tablename, id, req, res, next) {
  var connection = res.locals.database;
  connection.collection(tablename).deleteOne(id, function (err, result) {
    if (err) {
      throw err;
    }
    else {
      if (tablename == "subjects") {
        esController.searchInner(id, function (err, result) {
          console.log("searchInner: ", err, result);

          if (err) {
            res.locals.data = {
              data: false,
              error: err
            }
            next();
          } else {
            res.locals.data = {
              data: true
            }
            next();
          }
        });
      }
      res.locals.data = {
        data: true
      };
      next();
    }
  });
}

module.exports.addData = addData;
module.exports.getAll = getAll;
module.exports.updateData = updateData;
module.exports.deleteData = deleteData;