/**
 * Created by itamar on 26/07/2017.
 */

var scripts = ["libs/servicebusjssdk-1.2.min.js","content.js"]

for(i in scripts){
    var scriptPath = scripts[i];
    var s = document.createElement('script');
    s.src = chrome.extension.getURL(scriptPath);
    (document.head||document.documentElement).appendChild(s);
    s.parentNode.removeChild(s);
}

