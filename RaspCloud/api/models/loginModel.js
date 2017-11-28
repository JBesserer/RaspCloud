const os = require('os');
const _ = require('underscore');

const db = require('../dbconnect/dbconnect');

class loginModel {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    authentification(callback) {
        let dbconnect = new db();

        let sql = "SELECT * FROM user WHERE email=?";
        dbconnect.con.query(sql, [this.email], (err, results) => {
            if (err) {
                callback(new Error('Error while selecting in user table'));

                return;
            }
            callback(null, results[0]);
        });
    }
}

module.exports = loginModel;