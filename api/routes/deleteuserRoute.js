'use strict';
module.exports = (app) => {
    let usersController = require('../controllers/usersController');
    app.route('/deleteuser').post(usersController.delete);
};