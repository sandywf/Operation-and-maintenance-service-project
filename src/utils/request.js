import React from 'react';
import ReactDOM from 'react-dom';
import {Modal} from 'antd';
import {browserHistory,hashHistory} from 'react-router';
import {createHashHistory} from 'history';
var routerHistory =  require('react-router').useRouterHistory;  
const appHistory = routerHistory(createHashHistory)({queryKey:false});  
const BASE_URL = window.rootServer || 'http://10.5.235.25:8282/MaintenanceSystem';

var HTTPUtil = {};  
function getAuth(){
    return {'token':localStorage.getItem('token')};
}
/** 
* 基于 fetch 封装的 GET请求 
* @param url 
* @param params {} 
* @param headers 
* @returns {Promise} 
*/  

HTTPUtil.get = function(url, params,headers) {  
    if(headers){
        headers ={};
    }else{
        headers = getAuth();
    }
  if (params) {  
      let paramsArray = [];  
      //encodeURIComponent  
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))  
      if (url.search(/\?/) === -1) {  
          url += '?' + paramsArray.join('&')  
      } else {  
          url += '&' + paramsArray.join('&')  
      }  
  }  
  return new Promise(function (resolve, reject) {  
    fetch(BASE_URL + url, {  
          method: 'GET',  
          headers:headers 
        })  
        .then((response) => response.json())
        .then((response)=>{
            if(response.status){
                switch(response.status){
                    case '100000006':
                        appHistory.push('/login')
                        break;
                    case '100000004':
                        appHistory.push('/login')
                        break;
                    case '000000000':
                        return response;
                        break;
                    default:
                    Modal.error({content:response.message});
                }  
            }
           
        })
        .then((response) => {  
            resolve(response);  
        })  
        .catch((err)=> {  
          reject({status:-1});  
        })  
  })  
}  


/** 
* 基于 fetch 封装的 POST请求  FormData 表单数据 
* @param url 
* @param formData   
* @param headers 
* @returns {Promise} 
*/  
HTTPUtil.post = function(url, formData,headers) {  
    if(headers){
        headers ={};
    }else{
        headers = getAuth();
    }
  return new Promise(function (resolve, reject) {  
    fetch(BASE_URL + url, {  
          method: 'POST',  
          headers:headers,
          body:formData,  
        })
        .then((response) => response.json())
        .then((response)=>{
            if(response.status){
                switch(response.status){
                    case '100000006':
                        appHistory.push('/login')
                        break;
                    case '100000004':
                        appHistory.push('/login')
                        break;
                    case '000000000':
                        return response;
                        break;
                    default:
                    Modal.error({content:response.message});
                }  
            }
        })
        .then((response) => {  
            resolve(response);  
        })  
        .catch((err)=> {  
          reject({status:-1});  
        })  
  })  
}  
HTTPUtil.postno = function(url, formData,headers) {  
    if(headers){
        headers ={};
    }else{
        headers = getAuth();
    }
  return new Promise(function (resolve, reject) {  
    fetch(BASE_URL + url, {  
          method: 'POST',  
          headers:headers,
          body:formData,  
        })
        .then((response) => response.json())
        .then((response)=>{return response;})
        .then((response) => {  
            resolve(response);  
        })  
        .catch((err)=> {  
          reject({status:-1});  
        })  
  })  
}  
export default HTTPUtil;  