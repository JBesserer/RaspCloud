'use strict';

module.exports = (app) => {
    let uploadController = require('../controllers/uploadController');
    app.route('/upload-file').post(uploadController.upload_file);
};