const os = require('os');
const _ = require('underscore');

const pool = require('../dbconnect/dbconnect');

class profilModel {
    constructor(pk, nom, prenom, newPassword) {
        this.pk = pk;
        this.nom = nom;
        this.prenom = prenom;
        this.newPassword = newPassword;
    }

    update(callback) {
        if (!this.newPassword) {
            let sql = "UPDATE user SET lastName = '" + [this.nom] + "', firstName = '" + [this.prenom] + "' WHERE pk_user=?";
            pool.query(sql, [this.pk], (err, results) => {
                if (err) {
                    return callback(new Error('Erreur en mettant à jour le profil.'));
                }
            });
        } else {
            let sql = "UPDATE user SET lastName = '" + [this.nom] + "', firstName = '" + [this.prenom] + "', password = '" + [this.newPassword] + "' WHERE pk_user=?";
            pool.query(sql, [this.pk], (err, results) => {
                if (err) {
                    return callback(new Error('Erreur en mettant à jour le profil.'));
                }
            });
        }
        callback();
    }
}

module.exports = profilModel;