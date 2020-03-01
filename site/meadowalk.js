const express = require('express');
const fortune = require('./lib/fortune.js');

var app = express();

//утановка механизма представления handlebars
var handlebars = require('express-handlebars')
	.create({ defaultLayout: 'main',
	helpers:{
		section:function(name, options){
			if(!this._sections){this._sections = {}};
			this._sections[name] = options.fn(this);
			return null;
		}
	}
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
	res.locals.showTests = app.get('env') != 'production' && 
		req.query.test === '1';
	next();
})

app.get('/', function(req,res) {
	res.render('home');
});

app.get('/about', function(req,res) {
	res.render('about', { 
		fortune : fortune.getFortune(),
		pageTestScript : '/qa/tests-about.js' 
	});
});

app.get('/tours', function (req,res) {
	res.render('tours/tours', {
		currency: {
			name: 'Доллары США',
			abbrev: 'USD',
		},
		tours: [
			{ name: 'Река Худ', price: '$99.95' },
			{ name: 'Орегон Коуст', price: '$159.95' },
		],
		specialsUrl: '/january-specials',
	});
})
// taza tours ej srqel for_ov

app.get('/tours/hood-river', function (req,res) {
	res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function (req,res) {
	res.render('tours/request-group-rate');
});

// пользователская странца 404 ... (промежутчное ПО)??
app.use(function(req,res, next){
	res.status(404);
	res.render('404');

});

// пользователская странца 500 ... (промежутчное ПО)??
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Exprss run in http://localhost:' + 
		app.get('port') + ' press ctr + c for exit.' );
});
