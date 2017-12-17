'use strict';
module.exports = (app) => {
    let usersController = require('../controllers/usersController');
    app.route('/updateuser').post(usersController.update);
};