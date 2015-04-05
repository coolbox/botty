chrome.storage.sync.get(null, successCallback);

function successCallback(items){
  var urls = [];
  if(_.isUndefined(items) === false && _.isUndefined(items.favoriteUrls) === false){
    if(_.isEmpty(items.favoriteUrls.split(/\r\n|\r|\n/g);)){
      urls.push("http://www.ft.com/*");
      console.log("Empty", urls);
    } else {
      urls = items.favoriteUrls.split(/\r\n|\r|\n/g);;
      console.log("Not Empty", urls);
    }
  } else {
    urls.push("http://www.ft.com/*");
    console.log("Blank", urls);
  }
  
  init(urls);
}

function init(urls){
  chrome.webRequest.onBeforeSendHeaders.addListener(function(info) {
      // Replace the User-Agent header
      var headers = info.requestHeaders;
      headers.forEach(function(header, i) {
        if (header.name.toLowerCase() == 'user-agent') { 
          header.value = 'Googlebot/2.1 (+http://www.googlebot.com/bot.html)';
        }
      });  
      return {requestHeaders: headers};
    },
    // Request filter
    {
      // Modify the headers for these pages
      urls: urls,
      // In the main window and frames
      types: ["main_frame", "sub_frame"]
    }, ["blocking", "requestHeaders"]
  );
}