'use strict';

module.exports = (app) => {
    let uploadController = require('../controllers/uploadController');
    app.route('/upload-file').post(uploadController.upload_file);
    app.route('/load-files').get(uploadController.get_files);
    app.route('/load-shared-files').get(uploadController.get_shared_files);
    app.route('/delete-file').get(uploadController.delete_file);
    app.route('/share-file').get(uploadController.share_file);
    app.route('/unshare-file').get(uploadController.unshare_file);
    app.route('/file-metadata').get(uploadController.get_file_metadata);
};