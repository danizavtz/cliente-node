//jshint esversion: 6
const pg = exports;
const { Pool } = require('pg');

pg.initialize = function(databaseUrl, cb) {
    const pool = new Pool(databaseUrl);
    pool.connect(function(err) {
      if (err) {
        return cb(err);
      }
      pg.client = pool;
      return cb();
    });

};
