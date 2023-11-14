let http = require('http');
let fs = require('fs');
const PORT = 8080;
http.createServer(reqHandler).listen(PORT);
console.log(`Server On in Port ${PORT}`);
let funcs = {
    home: homePageController,
    about: aboutPageController,
}
let headers = {
    text: { 'Content-Type': 'text/plain' },
    html: { 'Content-Type': 'text/Html' }
};


// let styles = `
// <style>
// div{
//     background-color:gray;
//     color:yellow;
//     width:200px;
//     height:200px;
//     display:flex;
//     align-items:center;
//     justify-content:center;
//     font-size:1.2rem;
//     border-radius:14px
//     }
// </style>
// `
// function homePageController(res) {
//     res.writeHead(200, headers.html);
//     let template = `
//     <html>
//         <head>
//             <title>Home Page</title>
//         </head>
//         <body>
//             ${styles}
//             <div>
//                 <h1>
//                     Home
//                 </h1>
//             </div>
//         </body>
//     </html>
//     `
//     res.write(template);
// }

// function aboutPageController(res) {
//     res.writeHead(200, headers.html);
//     let template = `
//     </html>
//     <html>
//         <head>
//             <title>Home Page</title>
//         </head>
//         <body>
//             ${styles}
//             <div>
//                 <h1>
//                 About
//                 </h1>
//             </div>
//         </body>
//     </html>
//     `
//     res.write(template);
// }


function homePageController(res) {
    fs.readFile('./pages/home.html', (error, data) => {
        res.writeHead(200, headers.html);
        res.write(data);
        console.log(error);
    })

}

function aboutPageController(res) {
    fs.readFile('./pages/about.html', (error, data) => {
        res.writeHead(200, headers.html);
        res.write(data);
        console.log(error);
    })
}


function reqHandler(req, res) {
    let path = req.url.split("/")[1]
    if (path !== "favicon.ico") {
        funcs[path](res);
    }
    res.end();
}