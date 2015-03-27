chrome.webRequest.onBeforeSendHeaders.addListener(
    function(info) {
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
        urls: [
            "http://www.ft.com/*",
            "http://www.quora.com/*"
        ],
        // In the main window and frames
        types: ["main_frame", "sub_frame"]
    },
    ["blocking", "requestHeaders"]
);