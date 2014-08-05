var mongoose = require('mongoose');

var bugSchema = mongoose.Schema({
	pname: String,
	title: String,
	time: String,
	dealer: String,
	level: String, //1-5代表低、中、高、紧急、严重
	fixed: String, //NO\YES
	description: String
});

bugSchema.methods = {
	getAllBugs: function(callback) {
		this.model('Bug').find({}, function(err, docs) {
			if(err) callback(err);
			callback(docs);
		});
	},
	findBug: function(id, callback) {
		this.model('Bug').find({_id: id}, function(err, docs) {
			if(err) callback(err);
			callback(docs[0]);
		});
	},
	updataData: function(id, data, callback) {
		this.model('Bug').findOneAndUpdate({_id: id}, {
			time: data.time,
			dealer: data.dealer,
			fixed: data.fixed,
			description: data.description
		}, function(err, docs) {
			if(err) callback(err);
			callback(docs);
		});
	}
};

mongoose.model('Bug', bugSchema);