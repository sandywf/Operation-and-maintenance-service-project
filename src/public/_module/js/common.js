import React from 'react';

class FormatUtils{
  requestFullScreen(element) {  
      function checkFull(){
            // var elevenFull = document.body.scrollHeight==window.screen.height&&document.body.scrollWidth==window.screen.width;
            var isFull =  document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
            if(isFull === undefined) isFull = false;
            return isFull;
        }
      window.onresize = function(){
            if(!checkFull()){
                  element.setAttribute("screen","tuichu");      
            }else{
                  element.setAttribute("screen","quanping");
            }
      }
      var screenFall = element.getAttribute("screen");
      if(screenFall=='quanping'){
            // 判断各种浏览器，找到正确的方法
            var exitMethod = document.exitFullscreen || //W3C
            document.mozCancelFullScreen || //Chrome等
            document.webkitExitFullscreen || //FireFox
            document.webkitExitFullscreen; //IE11
            exitMethod.call(document);
            element.style.width= "1896px";
            element.style.height= "";
            element.style.overflow= "";
      } else{
            var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;    
            requestMethod.call(element);    
            element.style.width= "100%";
            element.style.height= "100%";
            element.style.overflow= "auto";
      }
  }
}
export default new FormatUtils