(function() {
  'use strict';
  const mysql = require('../../mysql/db');

  exports.lookupCliente = (req, res, next) => {
  	let sql = 'SELECT c.* FROM cliente c WHERE c.id = ?';
    mysql.query(sql,[req.body.login], (err, result, fields) => {
	    if (err) {
	        return res.status(500).json({ errors: ['Could not query cliente'] });
	    }
	    if (result.rows.length === 0) {
	        return res.status(404).json({ errors: ['Not found'] });
	    }
	    req.cliente = result.rows[0];
	    return next();
	});
  }

  exports.getCliente = (req, res) => {
  	res.status(200).json(req.cliente);
  	res.end();
  }

  exports.clientes = (req, res) => {
  	let sql = 'SELECT c.* FROM cliente c';
    console.log(mysql);
  	mysql.query(sql, (err, results, fields) => {
  		if(err){
        console.log(err);
  		    return res.status(500).json({ errors: ['Could not query cliente'] });
  		}
  		res.status(200).json(results[0].cliente);
  		res.end();
  	});
  };

  exports.addCliente = (req, res) => {
  	let sql = 'INSERT INTO cliente(login,email,phone) VALUES ($1,$2,$3)';
  	mysql.query(sql,[req.body.login, req.body.email, req.body.phone], (err, result, fields) => {
  		if(err){
  			return res.status(500).json({errors: ['Could not query cliente']});
  		}
  		res.status(201).json("Cliente criado com sucesso");
  		res.end();
  	});
  };

  exports.updateCliente = (req, res) => {
  	let sql = 'UPDATE cliente SET login = $1, email = $2, phone = $3 WHERE id = $4';
  	mysql.query(sql, [req.body.login, req.body.email, req.body.phone, req.params.id], (err, result, fields) =>{
  		if(err){
  			return res.status(500).json({errors: ['Could not query cliente']});
  		}
  		res.status(204);
  		res.end();
  	})
  };

  exports.deleteCliente = (req, res) => {
  	let sql = 'DELETE cliente WHERE id = $1';
  	mysql.query(sql, [req.params.id], (err, result,fields) =>{
  		if(err){ 
  			return res.status(500).json({errors: ['Could not query cliente']});
  		}
  		res.status(204);
  		res.end();
  	});
  };

})();