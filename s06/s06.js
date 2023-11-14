let http = require('http');
const PORT = 8080;
http.createServer(reqHandler).listen(PORT);

console.log(`Server On in Port ${PORT}`);

let headers = { 'Content-Type': 'text/plain' };


let funcs = {
    sum: Sum,
    power: Power
}


function Sum(res) {
    console.log("Sum");
    res.writeHead(200, headers);
    res.write("SUM");
}
function Power(res) {
    console.log("Power");
    res.writeHead(200, headers);
    res.write("Power");
}

function reqHandler(req, res) {
    let path = req.url.split("/")[1]
    if (path !== "favicon.ico") {
        funcs[path](res);
    }
    res.end();
}