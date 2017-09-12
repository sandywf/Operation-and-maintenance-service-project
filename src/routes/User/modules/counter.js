// ------------------------------------
// Constants
// ------------------------------------
import HTTPUtil from '../../../utils/request';
import utils from '../../../utils/utils';
import { Modal, Button } from 'antd';

export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const DO_DELETE = 'DO_DELETE'
export const SHOW_MODAL = 'SHOW_MODAL'
export const DO_ADD = 'DO_ADD'
export const DO_MODIFY = 'DO_MODIFY'
export const IS_VISIBLE = 'IS_VISIBLE'
// ------------------------------------
// Actions
// ------------------------------------

let headers = {'token':utils.wToken};
export const getKHData = () => {
    return (dispatch, getState) => {
        return HTTPUtil.post(utils.host+'/user/list','',headers).then((res) => {  
            //处理 请求success  
            if(res.status === '000000000' ){  
                dispatch({
                    type: COUNTER_INCREMENT,
                    res
                })
            }else{  
                     //处理自定义异常  
                Modal.error({content:res.message});
            }  
        },(res)=>{
             //TODO 处理请求fail     
        }) 
    }
}
//添加一条记录
export const doAdd = ({current,data})=>{
    let formData = new FormData();  
    formData.append("username",current.username); 
    formData.append("password",current.password); 
    formData.append("email",current.email); 
    formData.append("functions",current.functions);  
    formData.append("realname",current.realname); 
    formData.append("tel",current.tel);
    return (dispatch, getState) => {
        return HTTPUtil.post(utils.host+'/user/add',formData,headers).then((res) => {  
            //处理 请求success  
            if(res.status === '000000000' ){  
                Modal.success({content:res.message});
                dispatch({
                    type:DO_ADD,
                    data
                });
                dispatch(getKHData());
            }else{  
                     //处理自定义异常  
                Modal.error({content:res.message});
            }  
           },(res)=>{
             //TODO 处理请求fail     
        }) 
    }
}
//修改记录
export const doModify = ({current,data,userId})=>{
    // let func = [];
    // current.functions.forEach(function(item){
    //     func[func.length] = item.functionId;
    // });
    let formData = new FormData();  
    formData.append("username",current.username); 
    formData.append("password",current.password); 
    formData.append("email",current.email); 
    formData.append("functions",current.functions); 
    formData.append("realname",current.realname); 
    formData.append("tel",current.tel);
    formData.append("userId",userId);
    return (dispatch, getState) => {
        return HTTPUtil.post(utils.host+'/user/info/modify',formData,headers).then((res) => {  
            //处理 请求success  
            if(res.status === '000000000' ){  
                Modal.success({content:res.message});
                dispatch({
                    type:DO_MODIFY,
                    data
                });
                dispatch(getKHData());
            }else{  
                     //处理自定义异常  
                Modal.error({content:res.message});
            }  
           },(res)=>{
             //TODO 处理请求fail     
        }) 
    }
}
//删除记录
export const doDelete = ({record,data})=>{
    let formData = new FormData();  
    formData.append("userId",record.userId); 
    return (dispatch, getState) => {
        return HTTPUtil.post(utils.host+'/user/delete',formData,headers).then((res) => {  
            //处理 请求success  
            if(res.status === '000000000' ){  
                Modal.success({content:res.message});
                dispatch({
                    type:DO_DELETE,
                    data
                });
                dispatch(getKHData());
            }else{  
                     //处理自定义异常  
                Modal.error({content:res.message});
            }  
           },(res)=>{
             //TODO 处理请求fail     
        }) 
    }
}

//弹窗处理逻辑
export const showModal = ({current,data})=>{
    
    if(current.modalType == "add"){
        const temp = {};
        temp.title = current.title;
        temp.modalType = current.modalType;
        current = temp;
    }else if(current.modalType == "modify"){
        // let func = [];
        // current.functions.forEach(function(item){
        //     func[func.length] = item.functionId;
        // });
        // current.functions = func;
    }
    return {
        type:SHOW_MODAL,
        current,
        data
    }
    
}
//显示弹窗
export const setVisible = (isVisible)=>{
    return{
        type:"IS_VISIBLE",
        isVisible
    }
}
export const actions = {
  getKHData,
  doDelete,
  showModal,
  doAdd,
  doModify,
  setVisible
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]: (state, action) => {
    return {data:action.res.result};
  },
  [DO_DELETE]: (state, action) => {
    return {data:action.data};
  },
  [SHOW_MODAL]: (state, action) => {
    state = Object.assign({current:{"title":"添加"},data:[]}, action);
    return Object.create({current:action.current,data:action.data});
  },
  [DO_ADD]: (state, action) => {
    return {data:action.data};
  },
  [DO_MODIFY]: (state, action) => {
    return {data:action.data};
  },
  [IS_VISIBLE]: (state, action) => {
    return {isVisible:action.isVisible};
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
/*const initialState*/
const initialState = {
    data: [],
    current:[],
    isVisible:false
}
export default function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
