var mongoose = require('mongoose');

exports.index = function(req, res) {

	var data = "hello world!!!!!";

	res.send(data)
}