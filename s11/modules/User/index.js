const fs = require("fs");
let headers = {
  text: { "Content-Type": "Text/Plain" },
  html: { "Content-Type": "Text/Html" },
  json: { "Content-Type": "application/json" },
};
function write(res, statusCode, headerType, body) {
  res.writeHead(statusCode, headers[headerType]);
  res.write(body);
  res.end();
}
function writeJson(req, res, data) {
  fs.readFile("data.json","utf-8", (error, filedata) => {
    if (error) {
      write(res, 404, "text", "file not found");
    } else {
      filedata = JSON.parse(filedata);
      filedata.data.push(JSON.parse(data));
      filedata = JSON.stringify(filedata);
      fs.writeFile("data.json", filedata, "utf-8", (error) => {
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

exports.addUser = writeJson;
exports.getUser = getJson;