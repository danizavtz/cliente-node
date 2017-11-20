var mysql = exports;
var mysqllib = require('mysql');
mysql.initialize = function(dbconfig, cb){
	var dbconf = mysqllib.createConnection(dbconfig);
	dbconf.connect(function(err){
		if(err) throw err;
		console.log(dbconf);
		mysql = dbconf;
		cb()
	});
};
