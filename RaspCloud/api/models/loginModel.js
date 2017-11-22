const os = require('os');
const _ = require('underscore');

const db = require('../dbconnect/dbconnect');
let dbconnect = new db();

class loginModel{
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    authentification(login,callback) {

        dbconnect.con.connect(function(err){
            if(err) {
                callback(new Error('Error while connecting to DB'));
                return;
            }
            console.log("Connected!");
            let sql ="SELECT * FROM user WHERE email='"+login.email+"'";
            dbconnect.con.query(sql, function(err,result){
                if(err){
                    callback(new Error('Error while selecting in user table'));
                    return;
                }
                callback(null,result);
            });
        });
    }
}

module.exports = loginModel;