chrome.webRequest.onBeforeRequest.addListener(function(details){
    console.log(details.url.indexOf('/js/'), details.url);
    if(details.url.indexOf('/js/') > 0) {
        var url = btoa(details.url);
        return { redirectUrl: "http://localhost:9045/?file="+ url };
    }
},
{urls: [ "<all_urls>" ]},['blocking']);