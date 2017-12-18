'use strict';
module.exports = (app) => {
    let usersController = require('../controllers/usersController');
    app.route('/getAllUsers').get(usersController.getAllUsers);
};