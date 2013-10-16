/*
 * GET home page.
 */
var DbProvider = require('abstracts').db;
var findResults = DbProvider.connect(function(err, db) {
	if (err) {
		console.error(err);
		return err;
	}
	db.collectionNames(function(err, collections) {
		console.log('Collections');
		console.log(collections);
	});
	console.log('break');
	db.collection('abstracts', function(err, collection) {
		console.log('abstracts Collection');
		console.log(collection.find().toArray(function(err, docs) {
			console.log(docs);
		}));
	});
	
});
exports.index = function(req, res) {
	res.render(
		'index', {
			title: 'Express',
			abstracts: 'Empty... for now'
		}
	);
};