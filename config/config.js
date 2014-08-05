var path = require('path'),
	rootPath = path.normalize(__dirname + '/..');

// 项目配置
module.exports = {
	development: {
		db: 'mongodb://localhost/bugs',
		root: rootPath,
		app: {
			name: 'bugCommit'
		}
	},
	production: {
		db: 'mongodb://localhost/bugs',
		root: rootPath,
		app: {
			name: 'bugCommit'
		}
	}
};