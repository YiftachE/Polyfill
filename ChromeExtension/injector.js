/**
 * Created by itamar on 26/07/2017.
 */

var scripts = ["libs/underscore-min.js",
                "libs/servicebusjssdk-1.2.min.js",
                "extensionJS.js","content.js"];

for(i in scripts){
    var scriptPath = scripts[i];
    var s = document.createElement('script');
    s.src = chrome.extension.getURL(scriptPath);
    s.type = `text/javascript`;
    (document.head||document.documentElement).appendChild(s);
    s.parentNode.removeChild(s);
}

//"libs/jquery-3.2.1.min.js",