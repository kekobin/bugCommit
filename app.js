var express = require('express'),
	fs = require('fs'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	http = require('http');

//引入配置文件
var env = process.env.NODE_ENV || 'development',
	config = require('./config/config')[env];

//启动数据库连接
mongoose.connect(config.db);

//引入所有model
var models_path = config.root + '/model';
fs.readdirSync(models_path).forEach(function(file) {
	require(models_path + '/' + file);
});

require('./config/passport')(passport, config);

//引入配置文件、环境设置、路由
var app = express();

//引入配置文件、环境设置
var setting = require('./config/setting')(app, config, passport);

//引入路由
var router = require('./config/router')(app, passport);


//启动服务器
http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

// expose app
exports = module.exports = app;
