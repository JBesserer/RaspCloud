'use strict';
const _ = require('underscore');
const userModel = require('../models/userModel.js');

exports.get_all_users = (req,res,next) =>{
    console.log('Getting all users!');
    let users = new userModel(null,null,null,null,null);
    users.getAllUser((error,users)=>{
        if (error) {
            next(error);
            return;
        }
        res.json(users);
    });
};
