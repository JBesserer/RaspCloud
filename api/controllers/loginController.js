'use strict';
const _ = require('underscore');
const loginModel = require('../models/loginModel');

exports.get_login = (req, res, next) => {
    let login = new loginModel(req.body.email, req.body.password);
    login.authentification((err, user) => {
        if (err) {
            next(err);
            return;
        }
        if (!user) {
            req.session.destroy();
            res.render('login', {error: 'Courriel ou mot de passe invalide !'});
        } else {
            if (req.body.password === user.password) {
                req.session.user = user;
                res.redirect('/dashboard');
                next();
            } else {
                res.render('login', {error: 'Courriel ou mot de passe invalide !'});
            }
        }
    });
};