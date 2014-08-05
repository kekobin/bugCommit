var express = require('express'),
	path = require('path'),
	fs = require('fs'),
	ejs = require('ejs'),
	mongoStore = require('connect-mongo')(express),
	flash = require('connect-flash'),
	connectTimeout = require('connect-timeout');

module.exports = function function_name(app, config, passport) {
	// all environments
	app.set('port', process.env.PORT || 3000);
	app.set('views',  config.root + '/views');
	app.engine('.html',ejs.__express);  
	app.set('view engine', 'html');  
	app.use(flash());
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('your secret here'));
	// express/mongo session storage
	app.use(express.session({
		secret: 'noobjs',
		store: new mongoStore({
			url: config.db,
			collection: 'sessions'
		})
	}));

	app.use(express.static(config.root + '/public'));

	app.use(passport.initialize());
	app.use(passport.session());
	
	app.use(app.router);

	//设置超时时间
	app.use(connectTimeout({
		time: 10000
	}));

	app.set('view options', {
		pretty: true
	});

	app.set('showStackError', true);
	// should be placed before express.static
	app.use(express.compress({
		filter: function(req, res) {
			return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
		},
		level: 9
	}));

	// development enviroment//启动 NODE_ENV=development node app.js
	if ('development' == app.get('env')) {
		app.use(express.errorHandler());
	}
	// production enviroment//启动 NODE_ENV=production node app.js
	if ('production' == app.get('env')) {
		app.use(express.errorHandler());
	}

};