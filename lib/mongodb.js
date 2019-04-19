var MongoClient = require('mongodb').MongoClient;
var conf = require('../config/database');

var url = 'mongodb://localhost:' + conf.connection.port;
var dbname = conf.connection.database;
var connection = [];


establishConnection = function (callback) {
	MongoClient.connect(url, { useNewUrlParser: true, poolSize: conf.connection.poolSize }, function (err, db) {
		connection = db
		var dab = connection.db(dbname);
		if (typeof callback === 'function' && callback)
			callback(connection)
		console.log("connection succesful");

		dab.createCollection("companies", function (err, res) {
			if (err) throw err;
			console.log("Collection companies created!");
		});
		dab.createCollection("personnels", function (err, res) {
			if (err) throw err;
			console.log("Collection personnels created!")
		});
		dab.createCollection("subjects", function (err, res) {
			if (err) throw err;
			console.log("Collection subjects created!")
		});
		dab.createCollection("comments", function (err, res) {
			if (err) throw err;
			console.log("Collection comments created!")
		});
		dab.createCollection("tags", function (err, res) {
			if (err) throw err;
			console.log("Collection tags created!")
		});
	})
};

function getconnection() {
	return connection;
}

module.exports = {

	establishConnection: establishConnection,
	getconnection: getconnection
}
