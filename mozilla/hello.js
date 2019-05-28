//load http module
var http = require("http");

//create a server, listen on port 8000
http
  .createServer((req, res) => {
    //set resposne http header with content type
    res.writeHead(200, { "content-type": "text/plain" });

    //set response body
    res.end("hello world from brad");
  })
  .listen(8000);

console.log("listenin on 127.0.0.1:8000");
