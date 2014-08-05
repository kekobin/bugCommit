var mongoose = require("mongoose"),
  	Project = mongoose.model('Project'),
	uuid = require("node-uuid");


exports.create = function(req, res) {
	var id = uuid().v1;
	var tdata = req.body;
	var date = new Date();
	var time = date.getFullYear()+'.'+parseInt(date.getMonth()+1)+'.'+date.getDate()+' '+parseInt(date.getHours()+1)+':'+parseInt(date.getMinutes()+1)+':'+parseInt(date.getSeconds()+1);
	var pdata = {
		uid: id,
		name: tdata.name,
		staffs: tdata.staffs,
		time: time
	};

	var project = new Project(pdata);

	project.save(function(err) {
		if (err) {
			return res.send("fail insertProject");
		} else {
			return res.send("success");
		}
	});
};

exports.getProjectsInfo = function(req, res) {
	var project = new Project();
	project.getProjects(req.user.email, function(data) {
		console.log("get projects infomation");
		console.log(data);
		if(data.length != 0) {
			res.send(data);
		}
	});
};

exports.delProjectUser = function(req, res) {
	var project = new Project();
	var id = req.params.id;
	var user = req.user.email;
	project.delPartial(id, user, function(data) {
		res.send(data);
	});
};

exports.getProjectsInfoById = function(req, res) {
	var id = req.params.id;
	var project = new Project();
	project.findById(id, function(data) {
		res.send(data);
	});
};

exports.updateProject = function(req, res) {
	var project = new Project();
	var tdata = req.body;
	var date = new Date();
	var time = date.getFullYear()+'.'+parseInt(date.getMonth()+1)+'.'+date.getDate();
	var pData = {
		name: tdata.name,
		staffs: tdata.staffs,
		time: time
	};

	project.changeData(pData, function(data) {
		res.send(data);
	});
};
