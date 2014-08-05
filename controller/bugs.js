var mongoose = require("mongoose"),
	Bug = mongoose.model("Bug");

exports.create = function(req, res) {
	var tdata = req.body;
	var model = {
		pname: tdata.pname,
		title: tdata.title,
		time: tdata.time,
		dealer: tdata.dealer,
		level: tdata.level,
		fixed: tdata.fixed,
		description: tdata.description
	};
	var bug = new Bug(model);
	bug.save(function(err) {
		if (err) {
			return res.send("fail insertProject");
		} else {
			return res.send("success");
		}
	});
};

exports.getBugs = function(req, res) {
	var bug = new Bug();
	bug.getAllBugs(function(data) {
		res.send(data);
	});
};

exports.getBugInfo = function(req, res) {
	var id = req.params.id;
	var bug = new Bug();
	bug.findBug(id, function(data) {
		res.send(data);
	});
};

exports.updateBug = function(req, res) {
	var id = req.params.id;
	var model = req.body;
	var uData = {
		time: model.time,
		dealer: model.dealer,
		fixed: model.fixed,
		description: model.description
	};
	var bug = new Bug();
	bug.updataData(id, uData, function(data) {
		res.send(data);
	});
}