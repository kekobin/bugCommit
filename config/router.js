module.exports = function(app, passport) {
	var users = require('../controller/users');
	app.get('/users', users.getUsers);
	app.post('/signup', users.create);
	app.post('/session', passport.authenticate('local', {
		failureRedirect: '/login',
		failureFlash: 'Invalid email or password.'
	}), function(req, res) {
		res.redirect('/desktop');
	});

	var projects = require('../controller/projects');
	app.post('/api/project', projects.create);
	app.get('/api/project', projects.getProjectsInfo);
	app.get('/api/project/:id', projects.getProjectsInfoById);
	app.put('/api/project/:id', projects.delProjectUser);
	app.put('/api/project', projects.updateProject);

	var bugs = require('../controller/bugs');
	app.post('/api/bug', bugs.create);
	app.get('/api/bug', bugs.getBugs);
	app.get('/api/bug/:id', bugs.getBugInfo);
	app.put('/api/bug/:id', bugs.updateBug);

	app.get('/', function(req, res) {
		res.render('login');
	});
	app.get('/login', function(req, res) {
		res.render('login');
	});
	app.get('/signup', function(req, res) {
		res.render('signup');
	});
	//project
	app.get('/desktop', function(req, res) {
		res.render('desktop', {user: req.user.email});
	});
	app.get('/project', function(req, res) {
		res.render('createProject',{user: req.user.email});
	});
	app.get('/project/:id', function(req, res) {
		res.render('createProject',{
			_id: req.params.id,
			user: req.user.email
		});
	});
	//bug
	app.get('/desktop/projectInfo/:pname/:pid', function(req, res) {
		res.render('projectInfo', {
			pname: req.params.pname,
			pid: req.params.pid,
			user: req.user.email
		});
	});
	app.get('/project/bug/:pname/:pid', function(req, res) {
		res.render('createBug',{
			pname: req.params.pname,
			pid: req.params.pid,
			user: req.user.email
		});
	});
	app.get('/project/bug/:id/:pname/:pid', function(req, res) {
		res.render('createBug',{
			_id: req.params.id,
			pname: req.params.pname,
			pid: req.params.pid,
			user: req.user.email
		});
	});
	app.get('/logout', function(req, res) {
		res.redirect('/login');
	});
};