const os = require('os');
const _ = require('underscore');

const pool = require('../dbconnect/dbconnect');

class usersModel {
    constructor(email, nom, prenom, password, statut) {
        this.email = email;
        this.nom = nom;
        this.prenom = prenom;
        this.password = password;
        this.statut = statut;
    }

    add(callback) {
        let sql = "INSERT INTO user (email, lastName, firstName, password, fk_type_user) VALUES ('" + [this.email] + "', '" + [this.nom] + "', '" + [this.prenom] + "', '" + [this.password] + "', '" + [this.statut] + "')";
        pool.query(sql, (err, results) => {
            if (err) {
                return callback(new Error('Erreur en ajoutant un utilisateur.'));
            }
        });
        callback();
    }
}

module.exports = usersModel;