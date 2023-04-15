// Copyright 2015 Yandex LLC. All rights reserved.
// Author: Pavel Politov <ppolitov@yandex-team.ru>

'use strict';

var callbackRegistry = {};
window.callbackRegistry = callbackRegistry;

function scriptRequest(url, resolve, reject) {
  var scriptOk = false;
  var callbackName = 'cb' + String(Math.random()).slice(-6);

  url += ~url.indexOf('?') ? '&' : '?';
  url += 'callback=callbackRegistry.' + callbackName;

  callbackRegistry[callbackName] = function(data) {
    scriptOk = true;
    delete callbackRegistry[callbackName];
    resolve(data);
  };

  function checkCallback() {
    if (scriptOk) return;
    delete callbackRegistry[callbackName];
    reject();
  }

  var script = document.createElement('script');
  script.onreadystatechange = function() {
    if (this.readyState == 'complete' || this.readyState == 'loaded') {
      this.onreadystatechange = null;
      setTimeout(checkCallback, 0);
    }
  };

  script.onload = script.onerror = checkCallback;
  script.src = url;

  document.body.appendChild(script);
}

// module.exports = {
//   requestJSON: function(url) {
//     return new Promise(function(resolve, reject) {
//       scriptRequest(url, resolve, reject);
//     });
//   }
// };



var requestJSON = function(url) {
  return new Promise(function(resolve, reject) {
    scriptRequest(url, resolve, reject);
  });
}
