var debug = require('debug')('frontend-code-challenge');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var logger = require('./lib/logger');

var app = express();
var log = logger(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));

var dictionary = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z']

app.post('/convertNumber', function(req, res) {
	let number = req.body.value;
	let i = 0;
	let base = 2;
	let stack = [];
	
	if (typeof parseInt(number) !== 'number' || !number) {
		res.json('Value is not an integer');
	}

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


app.post('/convertNumerals', function(req, res) {
	let numerals = req.body.value;
	let base = 2;
	let stack = [];

	for (var i=0; i<numerals.length; i++) {
		for (var key in dictionary) {
			if (dictionary[key] == numerals[i])
				stack.push(Math.pow(base, key))
		}
	}

	var total = 0;
	for (var j in stack) {
		total += stack[j]
	}

	res.json(total);    
});

app.post('/abbForm', function(req, res) {
	let numerals = req.body.value;
	let base = 2;
	let stack = [];

	for (var i=0; i<numerals.length; i++) {
		for (var key in dictionary) {
			if (dictionary[key] == numerals[i])
				stack.push(Math.pow(base, key))
		}
	}

	var total = 0;
	for (var j in stack) {
		total += stack[j]
	}

	let number = total;
	i = 0;
	stack = [];
	
	if (typeof parseInt(number) !== 'number' || !number) {
		res.json('Value is not an integer');
	}

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