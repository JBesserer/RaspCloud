'use strict';
const _ = require('underscore');
const uploadModel = require('../models/uploadModel');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

exports.upload_file = (req, res, next) => {
    const dirUpload = path.dirname(require.main.filename)+"/public/uploads/";
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        let oldpath = files.file.path;
        let newpath = dirUpload + files.file.name;
        let filepath;
        console.log(newpath);
        //If the file already exists, it adds the time in millisecond to the title of the file instead of crushing it
        fs.access(newpath, (err) => {
            if (!err) {
                let rightNow = Date.now();
                newpath = dirUpload+rightNow+"_"+files.file.name;
                filepath = "/public/uploads/"+rightNow+"_"+files.file.name;
                console.log(newpath);
            }

            fs.rename(oldpath, newpath, (err) => {
                if (err) throw err;
                let fileToUpload = new uploadModel(filepath,req.session.user.pk_user);
                fileToUpload.upload((err, user) => {
                    console.log('Reloading Files...');
                    if (err) {
                        next(err);
                        return;
                    }
                    res.end();
                });
            });
        });
    });
};