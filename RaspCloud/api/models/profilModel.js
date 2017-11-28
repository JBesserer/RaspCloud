const os = require('os');
const _ = require('underscore');

const db = require('../dbconnect/dbconnect');

class profilModel {
    constructor(pk, nom, prenom, newPassword) {
        this.pk = pk;
        this.nom = nom;
        this.prenom = prenom;
        this.newPassword = newPassword;
    }

    update(callback) {
        let dbconnect = new db();
        if (!this.newPassword) {
            let sql = "UPDATE user SET lastName = '" + [this.nom] + "', firstName = '" + [this.prenom] + "' WHERE pk_user=?";
            dbconnect.con.query(sql, [this.pk], (err, results) => {
                if (err) {
                    return callback(new Error('Erreur en mettant à jour le profil.'));
                }
            });
        } else {
            let sql = "UPDATE user SET lastName = '" + [this.nom] + "', firstName = '" + [this.prenom] + "', password = '" + [this.newPassword] + "' WHERE pk_user=?";
            dbconnect.con.query(sql, [this.pk], (err, results) => {
                if (err) {
                    return callback(new Error('Erreur en mettant à jour le profil.'));
                }
            });
        }
        let sqlSelect = "SELECT * FROM user WHERE pk_user=?";
        dbconnect.con.query(sqlSelect, [this.pk], (errSelect, resultsSelect) => {
            if (errSelect) {
                return callback(new Error('Error while selecting in user table'));
            }
            callback(null, resultsSelect[0]);
        });
    }
}

module.exports = profilModel;