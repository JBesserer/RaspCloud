'use strict';
const path = require('path');
const _ = require('underscore');
const express = require('express');
const cons = require('consolidate');
const bodyParser = require('body-parser');
const session = require('client-sessions');

const paintingRoutes = require('./api/routes/paintingRoute');
const personRoutes = require('./api/routes/personRoutes');
const loginRoutes = require('./api/routes/loginRoute');

let app = express();
let port = process.env.PORT || 3000;

// Setup basic template engine
app.engine('html', cons.underscore);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'public'));
_.templateSettings = {
	evaluate : /<<%([\s\S]+?)%>>/g,
	interpolate : /<<%=([\s\S]+?)%>>/g,
	escape : /<<%-([\s\S]+?)%>>/g
};

// parse application/json and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup middlewares
app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));

//Routes linked to the app
paintingRoutes(app);
personRoutes(app);
loginRoutes(app);

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

app.listen(port);

console.log('RaspCloud server started on: ' + port);