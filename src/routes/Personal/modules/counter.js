import HTTPUtil from '../../../utils/request';
import utils from '../../../utils/utils';
// ------------------------------------
// Constants
// ------------------------------------
let headers = {'token':utils.wToken};

export const PERSON_INFO = 'PERSON_INFO'
export const UPDATE_PWD = 'UPDATE_PWD'
// ------------------------------------
// Actions
// ------------------------------------
// 获取用户信息
export function person () {
  return (dispatch, getState) => {
    return HTTPUtil.post(utils.host+'/user/info/get','',headers).then((res) => {  
        //处理 请求success  
        if(res.status === '000000000' ){  
            dispatch({
                type:PERSON_INFO,
                res
            })
        }else{  
                //处理自定义异常  
            alert(res.message);
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
    return HTTPUtil.post('http://10.5.224.23:8181/MaintenanceSystem/user/password/modify',formData,headers).then((res) => {  
        //处理 请求success  
        if(res.status === '000000000' ){  
            dispatch({
                type:UPDATE_PWD,
                data
            })
        }else{  
                //处理自定义异常  
            alert(res.message);
        }  
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
    return {data:action.res.result};
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