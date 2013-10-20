/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

var RedisStore = require('connect-redis')(express);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(express.cookieParser());
app.use(express.session({
        secret: '1234567890',
        store: new RedisStore({
                host: 'localhost',
                port: 6379,
                db: 0
        })
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/awesome', function(req, res) {
	if (req.session.lastPage) {
		//console.log(req.session);
		var oldPage = req.session.lastPage;
		req.session.lastPage = '/awesome';
		res.send('Last page was: ' + oldPage + '. ');
	} else {
		req.session.lastPage = '/awesome';
		res.send('No last page set');
	}
});

app.get('/radical', function(req, res) {
	if (req.session.lastPage) {
		//console.log(req.session);
		var oldPage = req.session.lastPage;
		req.session.lastPage = '/radical';
		res.send('Last page was: ' + oldPage + '. ');
	} else {
		req.session.lastPage = '/radical';
		res.send('No last page set');
	}
});

app.get('/tubular', function(req, res) {
	if (req.session.lastPage) {
		//console.log(req.session);
		var oldPage = req.session.lastPage;
		req.session.lastPage = '/tubular';
		res.send('Last page was: ' + oldPage + '. ');
	} else {
		req.session.lastPage = '/tubular';
		res.send('No last page set');
	}
	
});

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});