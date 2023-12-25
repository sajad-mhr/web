const http = require("http");
const fs = require("fs");
const axios = require("axios")
const add_user = require("./modules/User")
const get_user = require("./modules/User")
const PORT = 8080;
console.log(add_user);
const server = http.createServer(requestHandler);
server.listen(PORT);
console.log(`server listen in Port ${PORT}`);

let headers = {
    text: { "Content-Type": "Text/Plain" },
    html: { "Content-Type": "Text/Html" },
    json: { "Content-Type": "application/json" },
};

const routes = {
    users: usersRequest,
    x:funcx
};

function write(res, statusCode, headerType, body) {
    res.writeHead(statusCode, headers[headerType]);
    res.write(body);
    res.end();
}

async function funcx(request, response,data) {
    await axios.post("http://127.0.0.1:8081/x",data)
}


function usersRequest(req, res, data) {
    console.log(req.method);
    switch (req.method) {
        case "GET":
            get_user.getUser(req, res);
            break;
        case "POST":
            add_user.addUser(req, res, data);
            break;
        default:
            break;
    }
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
