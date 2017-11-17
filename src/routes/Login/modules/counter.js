import {hashHistory,browserHistory} from 'react-router';
import {createHashHistory} from 'history';
var routerHistory =  require('react-router').useRouterHistory;  
const appHistory = routerHistory(createHashHistory)({queryKey:false});  
import HTTPUtil from '../../../utils/request';
//import utils from '../../../utils/utils';
import {Modal} from 'antd';
// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN = 'LOGIN'

// ------------------------------------
// Actions
// ------------------------------------

export const login = ({username,password})=>{
  let formData = new FormData();  
  formData.append("username",username); 
  formData.append("password",password); 
  const headers = {};
  return (dispatch, getState) => {
      return HTTPUtil.post('/user/login',formData,headers).then((json) => {  
        if(json){
          json = json.result;
          var funcs = json.functions,funcsTag;
          if(funcs.length == 2){
            funcsTag='all';
          }else if(funcs[0]['functionName'] == '用户列表'){
            funcsTag='user';
          }else{
            funcsTag='flow';
          }
          localStorage.setItem('funcTag',funcsTag);
          localStorage.setItem('token',json.token);
          localStorage.setItem('realname',json.realname);
          localStorage.setItem('userType',json.userType);
              dispatch({
                type:LOGIN,
                json
              });
              appHistory.push('/');
        }
         
    },(json)=>{
      //TODO 处理请求fail       
    })  
  }
}
export const actions = {
  login,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN]    : (state, action) => {
    return {data:action.json}
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data: ''
}
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
