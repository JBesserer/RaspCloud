const os = require('os');
const _ = require('underscore');

const pool = require('../dbconnect/dbconnect');


class loginModel {
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

    getFilesUser(callback) {

        let sql = "SELECT * FROM file WHERE fk_user=?";
        pool.query(sql, [this.userID], (err, results, fields) => {
            if (err) {
                callback(new Error('Error while selecting user number '+ this.userID));

                return;
            }

            callback(null, results);
        });
    }

    getSharedFiles(callback) {

        let sql = "SELECT * FROM file WHERE shared_folder=1";
        pool.query(sql, [this.userID], (err, results, fields) => {
            if (err) {
                callback(new Error('Error while selecting shared files'));

                return;
            }

            callback(null, results);
        });
    }

    //Get a specific file
    getFile(callback) {

        let sql = "SELECT * FROM file WHERE pk_file=?";

        //User ID is actually pk_file in this instance (Cheated my own system)
        pool.query(sql, [this.userID], (err, results, fields) => {
            if (err) {
                callback(new Error('Error while selecting file number '+ this.userID));

                return;
            }

            callback(null, results);
        });
    }

    //Get a specific file
    deleteFile(callback) {

        let sql = "DELETE FROM file WHERE pk_file=?";

        //User ID is actually pk_file in this instance (Cheated my own system)
        pool.query(sql, [this.userID], (err, results, fields) => {
            if (err) {
                callback(new Error('Error while deleting file number '+ this.userID));

                return;
            }

            callback(null, results.affectedRows);
        });
    }

    shareFile(callback){
        let sql = "UPDATE file SET shared_folder = 1 WHERE pk_file=?";

        //User ID is actually pk_file in this instance (Cheated my own system)
        pool.query(sql, [this.userID], (err, results, fields) => {
            if (err) {
                callback(new Error('Error while sharing file number '+ this.userID));

                return;
            }

            callback(null, results.affectedRows);
        });
    }

    unshareFile(callback){
        let sql = "UPDATE file SET shared_folder = 0 WHERE pk_file=?";

        //User ID is actually pk_file in this instance (Cheated my own system)
        pool.query(sql, [this.userID], (err, results, fields) => {
            if (err) {
                callback(new Error('Error while unsharing file number '+ this.userID));

                return;
            }

            callback(null, results.affectedRows);
        });
    }
}

module.exports = loginModel;