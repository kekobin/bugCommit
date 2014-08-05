var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	uuid = require("node-uuid");

exports.create = function(req, res) {
	console.log("-------------添加用户---------------");
	console.log(req.body);
	if (req.body['password'] != req.body['password2']) {
		// req.flash("password error");
		return res.redirect('/signup');
	}
	var rdata = req.body;
	//密码加密
	// var crypto = require('crypto');
	// var key = "asdhjwheru*asd123-123"; //加密的秘钥
	// var cipher = crypto.createCipher("aes-256-cbc", key)
	// var crypted = cipher.update(rdata.password, 'utf8', 'hex');
	// crypted += cipher.final('hex');
	// console.log("----------------------------密码加密");
	// console.log(crypted);
	// rdata.password = crypted; //加密之后的值
	var id = uuid.v1();
	var userModel = {
		uid: id,
		email: rdata.email,
		password: rdata.password
	};
	var user = new User(userModel);
	user.save(function(err) {
		if (err) {
			return res.send("fail insertUser");
		} else {
			res.redirect('/login');
		}
	});
};

exports.getUsers = function(req, res) {
	var user = new User();
	user.findAllUsers(function(data) {
		res.send(data);
	});
}
