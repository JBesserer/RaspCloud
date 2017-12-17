'use strict';
module.exports = (app) => {
    let userController = require('../controllers/userController');

    app.route('/getAllUsers').get(userController.get_all_users);
};