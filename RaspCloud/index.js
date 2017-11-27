'use strict';
const path = require('path');
const _ = require('underscore');
const express = require('express');
const session = require('express-session');
const cons = require('consolidate');
const bodyParser = require('body-parser');

const loginRoutes = require('./api/routes/loginRoute');
const pageRouting = require('./api/routes/pageRouting');
const uploadRouting = require('./api/routes/uploadRoute');

let app = express();
let port = process.env.PORT || 3000;

// parse application/json and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup basic template engine
app.engine('html', cons.underscore);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'public'));
_.templateSettings = {
	evaluate : /<<%([\s\S]+?)%>>/g,
	interpolate : /<<%=([\s\S]+?)%>>/g,
	escape : /<<%-([\s\S]+?)%>>/g
};

app.use(express.static('public'));


app.use(session({
    secret:"fajdgdoiajt894ay492",
    resave: false,
    saveUninitialized: true
}));

//Routes linked to the app
loginRoutes(app);
pageRouting(app);
uploadRouting(app);

//Home page
app.get('/', (req, res) => {
	res.render('login');
});

// Error handling
app.use((err, req, res, next) => {
	console.error(err.stack);
	if (req.xhr) {
		res.status(500).send({ error: err.message })
	} else {
		res.render('error', { error: err.message })
	}
});

// Static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port);

console.log('RaspCloud server started on: ' + port);