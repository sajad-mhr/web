let http = require('http');
http.createServer(reqHandler).listen(8080);
let headers = { 'Content-Type': 'text/plain' }
function reqHandler(req, res) {
    res.writeHead(200, headers);
    console.log(req.url);
    res.write('url : ' + req.url);
    res.end();
}