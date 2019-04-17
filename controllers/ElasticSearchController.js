var elasticsearch =require('elasticsearch');
var mongodb = require('mongodb');

var client = new elasticsearch.Client({
	host: 'localhost:9200',
	log: 'trace',
});

client.ping({
	requestTimeout: 3000,
}, function(error){
	if (error) {
		console.error('elasticsearch cluster is down');
	} else{
		console.log('All is well');
	}
});

var createIndex = function(req,res,next){
	client.indices.create({
		index: 'company'
	}).then(function(resp){
		console.log("index created");
		res.status(200)
		return res.json(resp)
	},function(err){
		console.log("index not created");
		res.status(500)
		return res.json(err)
	});
}

var addDocument = function(req,res,next){
	client.index({
		index: 'company',
		type: 'subjects',
		id:req.body.id,
		body:{
			subject: req.body.subject,
			description: req.body.description,
			date: Date(),
			onay: false
		}
	}).then(function(resp){
		console.log("add document");
		res.status(200)
		return res.json(resp)
	},function(err){
		console.log("error ->",err);
		return res.json(err);
	});
};

var addDocumentInner = function(subObject,cb){
	client.index({
		index: 'company',
		type: 'subjects',
		id:subObject.insertId,
		body:{
			id: subObject._id,
			subject: subObject.subject,
			description: subObject.description,
			personnel_ID: subObject.personnel_ID,
			company_ID: subObject.company_ID,
			date: subObject.date,
			onay: subObject.onay
		}
	}).then(function(resp){
		console.log("ES result: ",resp);
		cb(null,true);
	},function(err){
		console.log("ES err: ",err);
		cb(err,null);
	});
};

var search = function(req,res,next){
	var value = req.query.value || req.body.value ||'';
	var companyid = res.locals.data.data.company_id;
	console.log("companyid", companyid);
	console.log("value",value);
	client.search({
		index: 'company',
		type: 'subjects',
		body:{
			query:{
				bool:{
					must: [
				    { "match": { "subject": value }},
 				    { "match": { "company_ID": companyid }}
  					]
				}
			}
		}
	}).then((body) =>{
		console.log("result ->",body.hits.hits[0]._id);
		res.json(body.hits);

	}, (error) => {
		console.trace(error.message);
	});
};

var deleteDocument = function(req,res,next){
	client.delete({
		index: 'company',
		type: 'subjects',
		id: req.params._id
	}, function(err,resp){
		if (err) {
			console.log(err.message);
		} else{
			console.log('silindi',resp);
			return res.json(resp)
		}
	})
}

var searchInner = function(subjectObject,cb){
	console.log("subjectObject",subjectObject)
	var value = subjectObject._id;
	//var companyid = res.locals.data.data.company_id;
	//console.log("companyid", companyid);
	console.log("value",value);
	client.search({
		index: 'company',
		type: 'subjects',
		body:{
			query:{
				bool:{
					must: [
				    { "match": { "id": value }},
  					]
				}
			}
		}
	}).then((body) =>{
		console.log("result ->",body.hits);
		client.delete({
			index: 'company',
			type: 'subjects',
			id: body.hits.hits[0]._id
		},function(err,resp){
			if (err) {
				console.log("silinmedi");
				throw err;
			} else{
				console.log("silindi",resp)
			}
		})
	}, (error) => {
		console.trace(error.message);
	});
};

module.exports.createIndex=createIndex;
module.exports.addDocumentInner=addDocumentInner;
module.exports.search=search;
module.exports.deleteDocument=deleteDocument;
module.exports.searchInner=searchInner;