'use strict';

module.exports = (app) => {
    let uploadController = require('../controllers/uploadController');
    app.route('/upload-file').post(uploadController.upload_file);
    app.route('/load-files').get(uploadController.get_files);
    app.route('/delete-file').get(uploadController.delete_file);
};