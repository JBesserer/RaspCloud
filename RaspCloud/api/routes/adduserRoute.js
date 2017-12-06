'use strict';
module.exports = (app) => {
    let usersController = require('../controllers/usersController');
    app.route('/adduser').post(usersController.add);
};