import HTTPUtil from '../../../utils/request';
import { Modal } from 'antd';
// ------------------------------------
// Constants
// ------------------------------------

export const PERSON_INFO = 'PERSON_INFO'
export const UPDATE_PWD = 'UPDATE_PWD'
// ------------------------------------
// Actions
// ------------------------------------
// 获取用户信息
export function person () {
  return (dispatch, getState) => {
    return HTTPUtil.post('/user/info/get','').then((res) => {  
      if(res){
          res = res.result;
          //处理 请求success  
          dispatch({
              type:PERSON_INFO,
              res
          }) 
      }      
    },(res)=>{
         //TODO 处理请求fail     
    }) 
  }
}
// 修改用户密码
export const updatePwd = ({current,data,userId})=>{
  let formData = new FormData();  
  formData.append("newPassword",current.newPassword); 
  formData.append("password",current.password); 
  formData.append("userId",userId); 
  return (dispatch, getState) => {
    return HTTPUtil.post('/user/password/modify',formData).then((res) => {  
      if(res){
        Modal.success({content:res.message});
        //处理 请求success  
        dispatch({
          type:UPDATE_PWD,
          data
        })
      }
        // Modal.success({content:res.message});  
       },(res)=>{
         //TODO 处理请求fail     
    }) 
  }
}

export const actions = {
  person,
  updatePwd
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [PERSON_INFO] : (state, action) => {
    return {data:action.res};
  },
  [UPDATE_PWD] : (state, action) => {
    return {data:action.data};
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data: []
}
export default function counterReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}