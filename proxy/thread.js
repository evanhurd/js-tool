module.exports = function(fileUrl, done) {
  const utils = require('./utils.js');
  const checksum = require('checksum');
  const fs = require('fs');

  var tool = require('../js-tool/src/index');
  utils.getJsFile(fileUrl)
  .then(content => {
    const cachePath = __dirname + "/cache/";
    const cs = checksum(content);
    const catchFile = cachePath + cs;
    if (fs.existsSync(catchFile)) {
      console.log('Loading from cache', cs);
      var tooledSrc = fs.readFileSync(catchFile, 'utf8');
    }else {
      console.log('Tooling URL', cs);
      try{
        var tooledSrc = tool(content);
        fs.writeFileSync(catchFile, tooledSrc, 'utf8');
      } catch(err) {
        console.log('TOOLING ERROR:', err);
        return done(content);
      }
    }
    return done(TEXP.toString() + tooledSrc);
  });


  function TEXP(a) {
    try{
      if(arguments[0] === 'SID') {
        console.log(a);
      }
    } catch(err) {}
    return a;
  }
};
