'use strict';
const _ = require('underscore');
const mysql = require('mysql');

class dbconnect {
    constructor() {
        this.con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "nodecloud"
        });
    }
}

module.exports = dbconnect;