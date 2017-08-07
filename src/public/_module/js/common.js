import React from 'react';

class FormatUtils{
  requestFullScreen(element) {    
      var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;    
      if (requestMethod) {      
          requestMethod.call(element);    
      } else if (typeof window.ActiveXObject !== "undefined") {      
          var wscript = new ActiveXObject("WScript.Shell");    
          if (wscript !== null) {    
              wscript.SendKeys("{F11}");    
          }    
      }    
  }
}
export default new FormatUtils