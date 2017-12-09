'use strict';

module.exports = (app) => {
    app.route('/download-file').get((req,res)=>{
        let file = "C:/wamp64/www/RaspCloud"+req.query.filepath;
        res.download(file); // Set disposition and send it.
    });
};