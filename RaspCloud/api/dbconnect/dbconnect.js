'use strict';
const _ = require('underscore');
const mysql = require('mysql');

let pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    port            : "3306",
    user            : 'root',
    password        : '',
    database: 'nodecloud'
});

module.exports = pool;
