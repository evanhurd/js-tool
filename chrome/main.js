console.log('running');
function request(url) {
    console.log(url);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
}

chrome.webRequest.onBeforeRequest.addListener(function(details){
  var code = request(details.url);
  var tooled = 'function TEXP(a) {return a;} ' + chrome.astRun(code);
  return { redirectUrl: "data:text/javascript," 
                            + encodeURIComponent(tooled) };
},
{urls: [ "*://*.google.com/*.js" ]},['blocking']);