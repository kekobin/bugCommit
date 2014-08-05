
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.back = function(req, res){
	
  res.render('index', { title: 'Express' });
};