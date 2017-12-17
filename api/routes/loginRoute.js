'use strict';
module.exports = (app) => {
    let loginController = require('../controllers/loginController');
    app.route('/login').post(loginController.get_login);
};