chrome.browserAction.onClicked.addListener(function(tab) {
    //var htmlCode = "tab/tab.html";
    //var url = "data:text/html," + htmlCode;
    chrome.tabs.create({url: 'tab/tab.html'});
 });