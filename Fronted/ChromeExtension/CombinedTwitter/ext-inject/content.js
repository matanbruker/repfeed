chrome.extension.sendRequest({cmd: "read_file"}, function(html){
    page = document.querySelector('.css-1dbjc4n.r-14lw9ot.r-1gm7m50.r-1ljd8xs.r-13l2t4g.r-1phboty.r-1jgb5lz.r-11wrixw.r-61z16t.r-13qz1uu.r-184en5c');
    page.html(html);
});