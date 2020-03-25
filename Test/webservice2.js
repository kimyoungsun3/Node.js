var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var _queryData = url.parse(_url, true).query;

    //http://localhost:3000/?id=html
    console.log(_queryData);    //[Object: null prototype] { id: 'html' }
    console.log(_queryData.id); //html
    if (request.url == '/') {
        _url = '/index.htm';
    }

    if (request.url == '/favicon.ico') {
        response.writeHead(404);
        response.end();
        return;
    }

    response.writeHead(200);
    //response.end(fs.readFileSync(__dirname + _url));
    response.end(_queryData.id);

});

app.listen(3000);
