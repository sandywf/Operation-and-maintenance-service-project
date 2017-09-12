import {browserHistory} from 'react-router';
import HTTPUtil from '../../../utils/request';
import utils from '../../../utils/utils';
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
  return (dispatch, getState) => {
      return HTTPUtil.post(utils.host+'/user/login',formData).then((json) => {  
      //处理 请求success  
        if(json.status === '000000000' ){  
              //我们假设业务定义code为0时，数据正常  
              //sessionStorage.setItem('token',json.result.token)
              utils.wToken = json.result.token;
              //global.wToken = json.result.token;
              dispatch({
                type:LOGIN,
                json
              })
              browserHistory.push('/')  
          }else{  
              //处理自定义异常  
              Modal.error({content:json.message});
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
    return {data:action.json.message}
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
