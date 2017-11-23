'use strict';
module.exports = (app) => {
    app.route('/dashboard').get(function(req,res){
        if(!req.session.user){
            res.redirect('/');
        }else{
            res.render('dashboard');
        }
    });
};