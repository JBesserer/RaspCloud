const os = require('os');
const _ = require('underscore');

const pool = require('../dbconnect/dbconnect');


class userModel {
    constructor(nom, prenom, courriel, statut) {
        this.nom = nom;
        this.prenom = prenom;
        this.courriel = courriel;
        this.statut = statut;
    }

    getAllUser(callback) {

        console.log("Connected to the database!");
        let sql = "SELECT * FROM user";
        pool.query(sql, (err, results) => {
            if (err) {
                callback(new Error('Error while selecting in user table'));

                return;
            }
            callback(null, results);
        });

    }
}

module.exports = userModel;