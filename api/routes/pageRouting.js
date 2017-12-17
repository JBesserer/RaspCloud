'use strict';
module.exports = (app) => {
    app.route('/dashboard').get((req,res)=>{
        if(!req.session.user){
            res.redirect('/');
        }else{
            res.render('dashboard', { firstName: req.session.user.firstName ,lastName: req.session.user.lastName, type_user: req.session.user.fk_type_user});
        }
    });

    app.route('/header').get((req,res)=>{
        if(!req.session.user) {
            res.render('header');
        }else{
            if(typeof(req.session.user.fk_type_user) !== 'undefined'){
                res.render('header', { type_user: req.session.user.fk_type_user});
            }else{
                res.render('header', { type_user: null});
            }
        }
    });

    app.route('/admin').get((req,res)=>{
        if(!req.session.user){
            res.redirect('/');
        }else{
            res.render('admin');
        }
    });

    app.route('/profil').get((req,res)=>{
        if(!req.session.user){
            res.redirect('/');
        }else{
            if (req.query.error !== null) {
                res.render('profil', { firstName: req.session.user.firstName, lastName: req.session.user.lastName, type_user: req.session.user.fk_type_user, error: req.query.error});
            }
            res.render('profil', { firstName: req.session.user.firstName, lastName: req.session.user.lastName, type_user: req.session.user.fk_type_user});

        }
    });

    app.route('/logout').get((req,res)=>{
        req.session.destroy();
        res.redirect('/');
    });

    app.route('/adduser').get((req,res)=>{
        if(!req.session.user){
            res.redirect('/');
        }else{
            if (req.query.error !== null) {
                res.render('adduser', { error: req.query.error});
            }
            res.render('adduser');
        }
    });

    app.route('/updateuser').get((req,res)=>{
        if(!req.session.user){
            res.redirect('/');
        }else{
            if (req.query.error !== null) {
                res.render('updateuser', { error: req.query.error});
            }
            res.render('updateuser');
        }
    });
};