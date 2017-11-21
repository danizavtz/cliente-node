//jshint esversion: 6
const pg = exports;
const { Pool } = require('pg');

pg.initialize = (databaseUrl, cb) => {
    const pool = new Pool(databaseUrl);
    pool.connect( err => {
      if (err) {
        return cb(err);
      }
      pg.client = pool;
      return cb();
    });

};
