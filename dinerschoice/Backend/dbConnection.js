/* eslint-disable linebreak-style */
/* eslint-disable no-console */

const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 15,
  host: 'yelp-dbinstance.c7p1dqcapamj.us-west-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Yelp_sjsu_273',
  database: 'diners_choice',
  dateStrings: true,
});

const dbConn = (query) => new Promise((resolve, reject) => {
  setTimeout(() => {
    pool.getConnection((err, conn) => {
      if (err) reject(err);
      console.log('Connected to DB!');
      pool.query(query, (error, result) => {
        if (!error) {
          conn.release();
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  }, 1000);
});

exports.dbConn = dbConn;
