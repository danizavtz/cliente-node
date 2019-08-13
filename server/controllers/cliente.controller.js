  const db = require('../../mysql/db');


  exports.lookupCliente = async(req, res, next) => {
  	let sql = 'SELECT c.* FROM cliente c WHERE c.id = $1';
    try{
      const result = await db.client.query(sql, [req.params.id]);
      if (result.rows.length === 0) {
          return res.status(404).json({ errors: [{ param: 'id', msg: 'Not found', value: req.params.id }] });
      }
      req.cliente = result.rows[0];
      next();
    } catch (e) {
      return res.status(500).json({ errors: [{ param: "", msg: e.detail, value: "" }] });
    }
	 };

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
      return res.status(500).json({ errors: [{ param: "", msg: e.detail, value: "" }] });
    }    
  };

  exports.addCliente = async(req, res) => {
  	let sql = 'INSERT INTO cliente(login,email,phone) VALUES ($1,$2,$3) RETURNING *';
    try {
      const result = await db.client.query(sql,[req.body.login || null, req.body.email, req.body.phone]);
      res.status(201).json(result.rows[0]);
      res.end();
    } catch (e) {
      return res.status(500).json({ errors: [{ param: 'id', msg: e.detail, value: ""}] });
    }
  };

  exports.updateCliente = async(req, res) => {
  	let sql = 'UPDATE cliente SET login = $1, email = $2, phone = $3 WHERE id = $4 RETURNING *';
    try{
      const result = await db.client.query(sql, [req.body.login || req.cliente.login, req.body.email, req.body.phone, req.params.id]);  	
      res.status(200).json(result.rows[0]);
      res.end();
    } catch (e){
      return res.status(500).json({ errors: [{ param: "", msg: e.detail, value: ""}] });      
    }
  };

  exports.deleteCliente = async(req, res) => {
  	let sql = 'DELETE FROM cliente WHERE id = $1';
    try {
      const result = await db.client.query(sql, [req.params.id]);
      res.status(204);
      res.end();
    } catch (e) {
      return res.status(500).json({ errors: [{ param: "", msg: e.detail, value: "" }] });
    }
  };