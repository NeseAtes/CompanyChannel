var mongodb = require('mongodb');
var fs = require('fs');

var uploadFile = function (req, res, next, tablename) {
    var id = { _id: new mongodb.ObjectId(req.body.id) };
    var path = req.file.path.replace('public\\', '');
    var connection = res.locals.database;
    connection.collection(tablename).findOne(id, function (err, result) {
        if (err) throw err;
        else if (result != null) {
            result.picture_paths.push(path);
            connection.collection(tablename).update(id, result);
            res.locals.data = { data: true };
            next();
        } else {
            res.locals.data = { data: false };
            next();
        }
    });
}
var deleteFile = function (tablename, id, res) { //id e sahip veriye bağlı tüm resimleri sil
    var connection = res.locals.database;
    connection.collection(tablename).findOne(id, function (err, result) {
        if (err) throw err;
        console.log(result)
        var filenames = result.picture_paths;
        filenames.forEach(element => {
            fs.unlink("public\\" + element, (err) => {
                if (err) throw err;
                console.log('successfully deleted');
                const index = filenames.indexOf(element);

                if (index !== -1) {
                    result.picture_paths.splice(index, 1);
                }
                connection.collection(tablename).update(id,result);
            });
        });
    });
}
module.exports.uploadFile = uploadFile;
module.exports.deleteFile = deleteFile;