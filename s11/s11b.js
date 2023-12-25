const http = require("http");
const fs = require("fs");
const PORT = 8081;
const server = http.createServer(requestHandler);
server.listen(PORT);
console.log(`server listen in Port ${PORT}`);

let headers = {
    text: { "Content-Type": "Text/Plain" },
    html: { "Content-Type": "Text/Html" },
    json: { "Content-Type": "application/json" },
};

const routes = {
    x:funcx
};

function write(res, statusCode, headerType, body) {
    res.writeHead(statusCode, headers[headerType]);
    res.write(body);
    res.end();
}

function funcx(request, response,data) {
    console.log(`Data : ${data}`);
    write(response,200,"text",JSON.stringify(data));
}

function requestHandler(req, res) {
    let route = req.url.split("/")[1];
    if (route !== "favicon.ico") {
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
        });
        req.on("end", () => {
            try {
                routes[route](req, res, data);
            } catch (err) {
                write(res, 404, "text", "api not found");
            }
        });
    }
}
