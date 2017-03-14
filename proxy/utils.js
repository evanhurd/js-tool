var request = require('request');
var url = require('url');

function getRequestedUrl(request) {
  var url_parts = url.parse(request.url, true);
  var query = url_parts.query;
  if(query.file) {
    return Buffer.from(query.file, 'base64').toString();
  } else {
    return null;
  }
}

function getJsFile(url) {
  return new Promise((resolve, reject) => {
    request(url, function (error, response, body) {
      if(error) {
        console.log('Error', error)
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
}

module.exports = {
  getRequestedUrl: getRequestedUrl,
  getJsFile: getJsFile
}