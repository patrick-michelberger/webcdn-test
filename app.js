var express = require('express');
var app = express();
var path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use('/scripts', express.static(__dirname + '/bower_components/'));

app.get('/', function(req, res) {
    res.render('index', {
        title: 'WebCDN Testpage'
    });
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
