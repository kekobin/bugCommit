var mongoose = require('mongoose');

var ProjectSchema = mongoose.Schema({
	uid: String, //项目id
	name: String, //项目名称 
	staffs: Array, //项目成员
	time: String //项目创建时间
});

ProjectSchema.methods = {
	getProjects: function(user, callback) {
		this.model('Project').find({}, function(err, docs) {
			var data = [];
			for (var i = 0, len = docs.length; i < len; i += 1) {
				var staffs = docs[i].staffs;
				for (var j = 0, jlen = staffs.length; j < jlen; j += 1) {
					if (staffs[j].name == user) {
						var tdata = {
							id: docs[i]._id,
							name: docs[i].name,
							time: docs[i].time,
							role: staffs[j].role
						};
						data.push(tdata);
						break;
					}
				}
			}
			callback(data);
		});
	},
	delPartial: function(id, user, callback) {
		var tProject = this.model('Project');
		var callMsg;
		tProject.find({
			_id: id
		}, function(err, docs) {
			var staffs = docs[0].staffs; //拿到数组
			for (var i = 0, len = staffs.length; i < len; i += 1) {
				if (user == staffs[i].name) {
					staffs.splice(i, 1); //去掉数组中的该项
					//重新更新数据库中该项目的成员
					tProject.update({
						_id: id
					}, {
						staffs: staffs
					}, function(err, result) {
						if (err != null) callMsg = "error";
						else callMsg = "success";
						console.log("update projects status:" + callMsg);

						callback(callMsg);
					});
					break;
				}
			}
		});
	},
	findById: function(id, callback) {
		this.model('Project').findOne({
			_id: id
		}, function(err, docs) {
			if (!docs) callback(err);
			callback(docs);
		});
	},
	changeData: function(updateData, callback) {
		var uData = {
			$set: {
				time: updateData.time,
				staffs: updateData.staffs
			}
		};

		this.model('Project').findOneAndUpdate({
			name: updateData.name
		}, uData, function(err, docs) {
			if (!docs) callback(err);
			callback(docs);
		});
	}
};

mongoose.model('Project', ProjectSchema);