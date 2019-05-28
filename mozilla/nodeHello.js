const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;

//create http server and listen on port 3000
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello world just node, no express");
});

server.listen(port, hostname, () => {
  console.log("listening on port 3000");
});
