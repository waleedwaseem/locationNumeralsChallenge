var debug = require('debug')('frontend-code-challenge');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var logger = require('./lib/logger');

var app = express();
var log = logger(app);

var dictionary = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z']

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));

app.post('/convertNumber', function(req, res) {
	let number = req.body.value;
	let i = 0;
	let base = 2;
	let stack = [];
	
	while (number > 0) {
		while (Math.pow(base, i) <= number) {
		  i++;
		}
		i--;
		stack.push(dictionary[i])
		number = number - Math.pow(base, i)
		i = 0;	
	}

	stack.reverse();
	res.json(stack);    
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    log.info('Express server listening on http://localhost:%d', server.address().port);
});