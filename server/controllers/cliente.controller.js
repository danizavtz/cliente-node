(function() {
  'use strict';
  const db = require('../../mysql/db');


  exports.lookupCliente = (req, res, next) => {
  	let sql = 'SELECT c.* FROM cliente c WHERE c.id = $1';
    db.client.query(sql,[req.params.id], (err, result) => {
	    if (err) {
	        return res.status(500).json({ errors: ['Could not query cliente'] });
	    }
	    if (result.rows.length === 0) {
          return res.status(404).json({ errors: [{ param: 'id', msg: 'Not found', value: req.params.id }] });
	    }
	    req.cliente = result.rows[0];
	    return next();
	 });
  }

  exports.getCliente = (req, res) => {
  	res.status(200).json(req.cliente);
  	res.end();
  }

  exports.clientes = async (req, res) => {
  	let sql = 'SELECT c.* FROM cliente c';
    try {
      const results = await db.client.query(sql);
      res.status(200).json(results.rows);
      res.end();
    } catch (e) {
      return res.status(500).json({ errors: [{ param: undefined, msg: 'Não foi possível consultar clientes', value: undefined }] });
    }    
  };

  exports.addCliente = (req, res) => {
  	let sql = 'INSERT INTO cliente(login,email,phone) VALUES ($1,$2,$3) RETURNING *';
  	db.client.query(sql,[req.body.login || null, req.body.email, req.body.phone], (err, result) => {
  		if(err){
        console.log(err);
  			return res.status(500).json({errors: ['Could not query cliente']});
  		}
  		res.status(201).json(result.rows[0]);
  		res.end();
  	});
  };

  exports.updateCliente = (req, res) => {
  	let sql = 'UPDATE cliente SET login = $1, email = $2, phone = $3 WHERE id = $4 RETURNING *';
  	db.client.query(sql, [req.body.login, req.body.email, req.body.phone, req.params.id], (err, result) =>{
  		if(err){
  			return res.status(500).json({errors: ['Could not query cliente']});
  		}
  		res.status(200).json(results.rows[0]);
  		res.end();
  	})
  };

  exports.deleteCliente = (req, res) => {
  	let sql = 'DELETE FROM cliente WHERE id = $1';
  	db.client.query(sql, [req.params.id], (err, result) =>{
  		if(err){ 
        console.log(err);
  			return res.status(500).json({errors: ['Could not query cliente']});
  		}
  		res.status(204);
  		res.end();
  	});
  };

})();