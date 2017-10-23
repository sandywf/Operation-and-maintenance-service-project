import React from 'react';

class FormatUtils{
  requestFullScreen(element,status) {  
      if(status){
            // 判断各种浏览器，找到正确的方法
            var exitMethod = document.exitFullscreen || //W3C
            document.mozCancelFullScreen || //Chrome等
            document.webkitExitFullscreen || //FireFox
            document.webkitExitFullscreen; //IE11
            exitMethod.call(document);
      } else{
            var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;    
            requestMethod.call(element);    
      }
  }
}
export default new FormatUtils