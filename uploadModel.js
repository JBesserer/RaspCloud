const os = require('os');
const _ = require('underscore');

const pool = require('../dbconnect/dbconnect');


class uploadModel {
    constructor(filepath, userID) {
        this.filepath = filepath;
        this.userID = userID;
        this.dateCreate = new Date();
    }

    upload(callback) {
        console.log("Connected to the database!");
        let fileInput  = {filepath: this.filepath, fk_user: this.userID, date_create: this.dateCreate};

        let sql = "INSERT INTO file SET ?";
        pool.query(sql, fileInput, (err, results, fields) => {
            if (err) {
                callback(new Error('Error while inserting in file table'));

                return;
            }
            callback(null, results.insertID);
        });
    }
}

module.exports = uploadModel;