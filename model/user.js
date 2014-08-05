/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = mongoose.Schema({ //创建用户模型
	uid: String, //用户账号
	email: String, //邮箱
	password: String //密码
});


UserSchema.methods = {
	/**
	 * Authenticate - check if the passwords are the same
	 *
	 * @param {String} plainText
	 * @return {Boolean}
	 * @api public
	 */
	authenticate: function(plainText) {
		return plainText == this.password;
	},
	checkUsername: function(username, callback) {
		this.model('User').find({
			username: username
		}, function(err, docs) {
			callback(docs);
		});
	},
	findAllUsers: function(callback) {
		this.model('User').find({}, function(err, docs) {
			if(err) callback(err);
			callback(docs);
		});
	}
};

mongoose.model('User', UserSchema); //创建新用户对象，并关联到模型