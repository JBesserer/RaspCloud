'use strict';
const _ = require('underscore');
const loginModel = require('../models/loginModel');


exports.get_login = (req, res, next) => {
    let login = new loginModel(req.body.email, req.body.password);
    login.authentification(login,(err, user) => {
        if (err) {
            next(err);
            return;
        }
        res.json(metadata);
    });
};