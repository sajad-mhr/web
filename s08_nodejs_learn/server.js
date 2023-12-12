const http = require("http");
const fs = require("fs");
const PORT = 8080;
const server = http.createServer(requestHandler);
server.listen(PORT);
console.log(`server listen in Port ${PORT}`);
let headers = {
  text: { "Content-Type": "Text/Plain" },
  html: { "Content-Type": "Text/Html" },
};
const routes = {
  page: pageHandler,
  404: pageNotFound,
  writeFile: writeFile,
  writeJson: writejson,
  getFile: getJson
};
function write(res, statusCode, headerType, body) {
  res.writeHead(statusCode, headers[headerType]);
  res.write(body);
  res.end();
}
function pageHandler(req, res) {
  let fileName = req.url.split("/")[2];
  fs.readFile(fileName, (err, data) => {
    if (err) {
      pageNotFound(req, res);
    } else {
      write(res, 200, "html", data);
    }
  });
}
function pageNotFound(req, res) {
  fs.readFile("./404.html", (err, data) => {
    write(res, 404, "html", data);
  });
}

function writeFile(req, res, data) {
  fs.writeFile('data.txt', data, 'utf-8', (error) => {
    if (error) {
      write(res, 201, "text", "not create file");
    } else {
      write(res, 200, "text", "Create File Successfully");
    }
  })
  console.log(`chunk data ==> ${data}`);
}

function writejson(req, res, data) {
  fs.readFile('data.txt', (error, filedata) => {
    if (error) {
      write(res, 404, "text", "file not found");
    } else {
      filedata = JSON.parse(filedata);
      filedata.data.push(JSON.parse(data));
      filedata = JSON.stringify(filedata);
      fs.writeFile('data.txt', filedata, 'utf8', (error) => {
        if (error) {
          write(res, 404, "text", "fs error");
        } else {
          write(res, 200, "text", "Save Data Successfully");
        }
      })
    }
  })
}


function getJson(req, res) {
  fs.readFile("data.txt", (err, data) => {
    if (err) {
      write(res, 404, "text", "file not found");
    } else {
      write(res, 200, "html", data);
    }
  })
}

function requestHandler(req, res) {
  let route = req.url.split("/")[1];
  if (route !== "favicon.ico") {

    let data = ""
    req.on('data', (chunk) => {
      data += chunk
    })
    req.on("end", () => {
      try {
        routes[route](req, res, data);
      } catch (err) {
        routes["404"](req, res);
      }
    })


  }
}
