var express = require('express');
var app = express();
var path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var AY = require('./aboutyou.js');
var products = [];

AY.fetchProducts(function(err, response) {
    products = response;
});

app.get('/', function(req, res) {
    res.render('index', {
        title: 'WebCDN Testpage',
        products: products
    });
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
