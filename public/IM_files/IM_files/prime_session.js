
(function() {
  var addIframe = function(url, id) {
    var iframe;
    iframe = document.createElement('iframe');
    iframe.setAttribute('id', id);
    iframe.setAttribute('frameBorder', '0');
    iframe.setAttribute('allowtransparency', 'true');
    iframe.style.cssText = 'z-index: 9999;\ndisplay: block;\nbackground: transparent;\nborder: 0px none transparent;\noverflow-x: hidden;\noverflow-y: auto;\nvisibility: hidden;\nmargin: 0;\npadding: 0;\n-webkit-tap-highlight-color: transparent;\n-webkit-touch-callout: none;\nposition: fixed;\nleft: 0;\ntop: 0;\nwidth: 0;\nheight: 0;';
    if (url != null) { iframe.src = url; }
    return document.body.appendChild(iframe);
  };

  /*
   * Chrome UserAgent contains 'Safari'… really
   * Chrome UA: Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36
   * Safari UA: Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25
   */
  var isSafari = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1;
  if ( isSafari ) { addIframe('https://id.looksharp.co/third_party_cookie_fix', 'ibex-cookie-fix'); }

  addIframe('https://id.looksharp.co/check_session', 'ibex-op-check-session-iframe');
  addIframe('/check_session', 'ibex-rp-check-session-iframe');
  addIframe(null, 'ibex-rp-refresh-session-iframe');
}).call(this);
