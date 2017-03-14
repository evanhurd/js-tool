var http = require("http");
const spawn = require('threads').spawn;
const utils = require('./utils');
//http://localhost:9045/?file=aHR0cHM6Ly93d3cuZ29vZ2xlLWFuYWx5dGljcy5jb20vYW5hbHl0aWNzLmpz

var server = http.createServer((request, response) => {
  let fileUrl = utils.getRequestedUrl(request);
  let write = (dat) => { response.writeHead(200, {"Content-Type": "text/javascript"}); response.write(dat); response.end()};
  if(!fileUrl) {
    write("'Not Found'");
  } else {
    toolUrl(fileUrl)
    .then(body => write(body));
  }
});

server.listen(9045);


function toolUrl(url) {
  return new Promise((resolve, reject) => {
    const thread = spawn('./thread.js');
    
    thread
      .send(url)
      .on('message', function(response) {
        resolve(response);
        thread.kill();
      })
      .on('error', function(error) {
        console.error('Worker errored:', error);
        reject(error);
      })
      .on('exit', function() {});
    });
}