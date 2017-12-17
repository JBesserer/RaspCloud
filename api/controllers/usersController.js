'use strict';
const _ = require('underscore');
const usersModel = require('../models/usersModel');

exports.add = (req, res, next) => {
    if (req.body.password !== req.body.passwordConfirmed) {
        return res.redirect('/adduser?error=Les mots de passe ne sont pas identiques');
    } else {
        let users = new usersModel("", req.body.email, req.body.nom, req.body.prenom, req.body.password, req.body.statut);
        users.add((err) => {
            if (err) {
                next(err);
                return;
            }
            res.redirect('/admin');
        });
    }
};

exports.delete = (req, res, next) => {
    let users = new usersModel(2, "", "", "", "", "");
    users.delete((err) => {
        if (err) {
            next(err);
            return;
        }
        res.redirect('/admin');
    });
};

exports.update = (req, res, next) => {
    if (req.body.password !== req.body.passwordConfirmed) {
        return res.redirect('/updateuser?error=Les nouveaux mots de passe ne sont pas identiques');
    } else {
        let users = new usersModel(2, req.body.email, req.body.nom, req.body.prenom, req.body.password, req.body.statut);
        users.update((err) => {
            if (err) {
                next(err);
                return;
            }
            res.redirect('/admin');
        });
    }
};
