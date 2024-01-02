const http = require("http");
const fs = require("fs");
const PORT = 8080;
const server = http.createServer(requestHandler);
const jwt = require("jsonwebtoken")
server.listen(PORT);
console.log(`server listen in Port ${PORT}`);

let headers = {
  text: { "Content-Type": "Text/Plain" },
  html: { "Content-Type": "Text/Html" },
  json: { "Content-Type": "application/json" },
};

const routes = {
  users: usersRequest,
  register: registerController,
  login: loginController
};

function write(res, statusCode, headerType, body) {
  res.writeHead(statusCode, headers[headerType]);
  res.write(body);
  res.end();
}

function writeJson(req, res, data) {
  fs.readFile("data.json", (error, filedata) => {
    if (error) {
      write(res, 404, "text", "file not found");
    } else {
      filedata = JSON.parse(filedata);
      filedata.data.push(JSON.parse(data));
      filedata = JSON.stringify(filedata);
      fs.writeFile("data.json", filedata, "utf8", (error) => {
        if (error) {
          write(res, 404, "text", "fs error");
        } else {
          write(res, 200, "text", "Save Data Successfully");
        }
      });
    }
  });
}

function getJson(req, res) {
  fs.readFile("data.json", (err, data) => {
    if (err) {
      write(res, 404, "text", "file not found");
    } else {
      write(res, 200, "json", data);
    }
  });
}

function usersRequest(req, res, data) {
  console.log(req.method);
  switch (req.method) {
    case "GET":
      getJson(req, res);
      break;
    case "POST":
      writeJson(req, res, data);
      break;
    default:
      break;
  }
}

function registerController(req, res, data) {
  let fObj = JSON.parse(data)
  if (fObj.fullname === undefined
    || fObj.email === undefined
    || fObj.password === undefined
  ) {
    write(res, 404, "text", "bad Data");
  } else {
    fs.readFile("data.json", (error, filedata) => {
      if (error) {
        write(res, 404, "text", "file not found");
      } else {
        filedata = JSON.parse(filedata);
        filedata.data.push(JSON.parse(data));
        filedata = JSON.stringify(filedata);
        fs.writeFile("data.json", filedata, "utf8", (error) => {
          if (error) {
            write(res, 404, "text", "fs error");
          } else {
            write(res, 200, "text", "register successfully");
          }
        });
      }
    });
  }
}

function loginController(req, res, data) {
  data = JSON.parse(data);
  console.log(data);
  if (data.email === undefined
    || data.password === undefined
  ) {
    write(res, 404, "text", "bad Data");
  } else {
    fs.readFile("data.json", "utf-8", (error, filedata) => {
      if (error) {
        write(res, 404, "text", "file not found");
      } else {
        filedata = JSON.parse(filedata);
        console.log(filedata.data);
        let status = false;
        filedata.data.forEach(user => {
          if (user.email === data.email && user.password === data.password) {
            const token = jwt.sign({ user }, 'shhhhh')
            write(res, 200, "text", `token: ${token}`);
            status = true
          }
        })
        if (status === false) {
          write(res, 200, "text", "user not found");
        }
      }
    });
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
