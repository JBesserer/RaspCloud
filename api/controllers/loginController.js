'use strict';
const _ = require('underscore');
const loginModel = require('../models/loginModel');


exports.get_login = (req, res, next) => {
    let login = new loginModel(req.body.email, req.body.password);
    login.authentification((err, user) => {
        console.log('Logging in...');
        if (err) {
            next(err);
            return;
        }
        if (!user) {
            console.log('no user, boy!');
            req.session.destroy();
            res.render('login', {error: 'Invalid email or password.'});
        } else {
            console.log('user exists');
            if (req.body.password === user.password) {
                req.session.user = user;
                res.redirect('/dashboard');
                next();
            } else {
                res.render('login', {error: 'Invalid email or password.'});
            }
        }
    });
};