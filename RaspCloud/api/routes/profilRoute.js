'use strict';
module.exports = (app) => {
    let profilController = require('../controllers/profilController');
    app.route('/profil').post(profilController.update);
};