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
            else{
                filepath = "/public/uploads/"+files.file.name;
            }
            fs.rename(oldpath, newpath, (err) => {
                if (err) throw err;
                let fileToUpload = new uploadModel(filepath,req.session.user.pk_user);
                fileToUpload.upload((err, user) => {
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

exports.get_files = (req, res, next) => {
    let getFiles = new uploadModel("",req.session.user.pk_user);

    getFiles.getFilesUser((err,results)=>{
        if (err) {
            next(err);
            return;
        }
        res.json(results);
    });
};

exports.delete_file = (req, res, next) => {
    let Model = new uploadModel(req.query.filepath,req.query.id); //In this specific situation, I'm cheating my own model by inserting the file id and NOT THE USER ID

    Model.getFile((err,results)=>{
        if (err) {
            next(err);
            return;
        }
        if(_.isEmpty(results)){
            next(err);
            return;
        }else{
            const dirUploads = path.dirname(require.main.filename)+results[0].filepath;
            fs.unlink(dirUploads, function (err) {
                if (err){
                    next(err);
                    return;
                }
                console.log('File deleted!');
            });
            Model.deleteFile((err,status)=>{
                if (err) {
                    next(err);
                    return;
                }
                res.end();
            });
        }
    });
};

