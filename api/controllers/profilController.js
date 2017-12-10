'use strict';
const _ = require('underscore');
const profilModel = require('../models/profilModel');

exports.update = (req, res, next) => {
    if (req.session.user.password !== req.body.oldPassword) {
        return res.redirect('/profil?error=Le mot de passe entré ne correspond pas au mot de passe actuel');
    } else if (req.body.newPassword !== req.body.newPasswordConfirmed) {
        return res.redirect('/profil?error=Les nouveaux mots de passe ne sont pas identiques');
    } else {
        let profil = new profilModel(req.session.user.pk_user, req.body.nom, req.body.prenom, req.body.newPassword);
        profil.update((err) => {
            if (err) {
                next(err);
                return;
            }
            req.session.user.lastName = req.body.nom;
            req.session.user.firstName = req.body.prenom;
            if (req.body.newPassword) {
                req.session.user.password = req.body.newPassword;
            }
            res.redirect('/dashboard');
        });
    }
};