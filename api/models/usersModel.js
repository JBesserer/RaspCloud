const os = require('os');
const _ = require('underscore');

const pool = require('../dbconnect/dbconnect');

class usersModel {
    constructor(pk_user, email, nom, prenom, password, statut) {
        this.pk_user = pk_user;
        this.email = email;
        this.nom = nom;
        this.prenom = prenom;
        this.password = password;
        this.statut = statut;
    }

    add(callback) {
        let sql = "INSERT INTO user (email, lastName, firstName, password, fk_type_user) VALUES (?, ?, ?, ?, ?)";
        pool.query(sql, [this.email, this.nom, this.prenom, this.password, this.statut], (err, results) => {
            if (err) {
                return callback(new Error('Erreur en ajoutant un utilisateur.'));
            }
        });
        callback();
    }

    update(callback) {
        if (!this.password) {
            let sql = "UPDATE user SET email=?, lastName=?, firstName=?, fk_type_user=? WHERE pk_user=?";
            pool.query(sql, [this.email, this.nom, this.prenom, this.statut, this.pk_user], (err, results) => {
                if (err) {
                    return callback(new Error('Erreur en modifiant un utilisateur.'));
                }
            });
        } else {
            let sql = "UPDATE user SET email=?, lastName=?, firstName=?, password=?, fk_type_user=? WHERE pk_user=?";
            pool.query(sql, [this.email, this.nom, this.prenom, this.password, this.statut, this.pk_user], (err, results) => {
                if (err) {
                    return callback(new Error('Erreur en modifiant un utilisateur.'));
                }
            });
        }
        callback();
    }

    delete(callback) {
        let sql = "DELETE FROM user WHERE pk_user=?";
        pool.query(sql, this.pk_user, (err, results) => {
            if (err) {
                return callback(new Error('Erreur en supprimant un utilisateur.'));
            }
        });
        callback();
    }
}

module.exports = usersModel;