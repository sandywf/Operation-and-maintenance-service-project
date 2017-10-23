import HTTPUtil from '../../../utils/request';
import { Modal } from 'antd';
import moment from 'moment';
// ------------------------------------
// Constants
// ------------------------------------
export const OVER_ALL = 'OVER_ALL';
export const UNUSUAL = 'UNUSUAL';
export const UP_FLOW = 'UP_FLOW';
export const DOWN_FLOW = 'DOWN_FLOW';
// ------------------------------------
// Actions
// ------------------------------------
// 获取全局状况数据
export const getOverall = () => {
    return (dispatch, getState) => {
        return HTTPUtil.get('/stream/globalview/info','').then((res) => {  
            if(res){
                res = res.result;
                //处理 请求success  
                dispatch({
                    type: OVER_ALL,
                    res
                }) 
            }
        },(res)=>{
             //TODO 处理请求fail     
        }) 
    }
}
// 获取DMS异常状态数据
export const getUnusual = (pageParams = { curPage: 1, pageSize: 10}) => {
    return (dispatch, getState) => {
        let formData = new FormData();  
        formData.append("curPage",pageParams.curPage); 
        formData.append("pageSize",pageParams.pageSize);
        return HTTPUtil.post('/stream/globalview/dms-error/list',formData).then((res) => {  
            if(res){
                res = res.result;
                 //处理 请求success  
                 dispatch({
                    type: UNUSUAL,
                    res
                }) 
            }    
        },(res)=>{
             //TODO 处理请求fail     
        }) 
    }
}
//获取折线图数据
export const getFlow = (params = { dotNum:13,timeNum:5,timeUnit:'MINUTE',xAxisTimeFormat:'HH:mm',endTime:moment().format('x')}) => {
    return (dispatch, getState) => {
        let formData = new FormData();  
        formData.append("dotNum",params.dotNum); 
        formData.append("timeUnit",params.timeUnit);
        formData.append("xAxisTimeFormat",params.xAxisTimeFormat);
        params.dmcTag && formData.append("dmcTag",params.dmcTag);
        params.dmsTag && formData.append("dmsTag",params.dmsTag);
        params.endTime && formData.append("endTime",params.endTime);
        params.timeNum && formData.append("timeNum",params.timeNum);
        params.streamName && formData.append("streamName",params.streamName);
        return HTTPUtil.post('/stream/globalview/graph',formData).then((res) => {  
            // if(res.status && res.status === "000000000"){
            //     res = res.result;
            // }else{
            //     Modal.error({content:res.message});
            // }
            //处理 请求success  
            if(res){
                res = res.result;
                dispatch({
                    type: UP_FLOW,
                    res
                }) 
            }
        },(res)=>{
             //TODO 处理请求fail     
        }) 
    }
}
//获取下行折线图
//获取折线图数据
export const getDownFlow = (params = { dotNum:13,timeNum:5,timeUnit:'MINUTE',xAxisTimeFormat:'HH:mm',endTime:moment().format('x')}) => {
    return (dispatch, getState) => {
        let formData = new FormData();  
        formData.append("dotNum",params.dotNum); 
        formData.append("timeUnit",params.timeUnit);
        formData.append("xAxisTimeFormat",params.xAxisTimeFormat);
        params.dmcTag && formData.append("dmcTag",params.dmcTag);
        params.dmsTag && formData.append("dmsTag",params.dmsTag);
        params.endTime && formData.append("endTime",params.endTime);
        params.timeNum && formData.append("timeNum",params.timeNum);
        params.streamName && formData.append("streamName",params.streamName);
        return HTTPUtil.post('/stream/globalview/graph',formData).then((res) => {  
            if(res){
                res = res.result;
                //处理 请求success  
                dispatch({
                    type: DOWN_FLOW,
                    res
                }) 
            }
        },(res)=>{
             //TODO 处理请求fail     
        }) 
    }
}
export const actions = {
    getOverall,
    getUnusual,
    getFlow,
    getDownFlow
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [OVER_ALL]: (state, action) => {
    if(action.res){
        return Object.assign({}, state, 
            {
                data:action.res,
            })
    }else{
        return state;
    }  
  },
  [UNUSUAL]: (state, action) => {
    if(action.res){
        return Object.assign({}, state, 
            {
                unsual:action.res.data,
                unsualCur:action.res.curPage,
                unsualDatas:action.res.totalDatas,
            })
    }else{
        return state;
    }  
  },
  [UP_FLOW]: (state, action) => {
    if(action.res){
        return Object.assign({}, state, 
            {
                flowData:action.res,
            })
    }else{
        return state;
    }  
  },
  [DOWN_FLOW]: (state,action) => {
    if(action.res){
        return Object.assign({}, state, 
            {
                downFlowData:action.res,
            })
    }else{
        return state;
    }  
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    data: [],
    unsual:[],
    unsualCur:'',
    unsualDatas:'',
    flowData:[],
    downFlowData:[]
}
export default function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
