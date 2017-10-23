import HTTPUtil from '../../../utils/request';
import { Modal } from 'antd';
// ------------------------------------
// Constants
// ------------------------------------
export const DMS_LIST_TYPE = 'DMS_LIST_TYPE';
export const DMS_AREA = 'DMS_AREA';
export const DMS_ADDRESS = 'DMS_ADDRESS';
export const DMS_ERROR = 'DMS_ERROR';
export const ERROR_RESET = 'ERROR_RESET';
// ------------------------------------
// Actions
// ------------------------------------
// 获取dms列表数据
export const getDMSData = (params = { curPage: 1, pageSize: 20,dmcTag:'',dmsName:'',isAlive:'',isOnline:'',orderColunm:'',orderAsc:'',serverType:'',}) => {
    return (dispatch, getState) => {
        let formData = new FormData();  
            formData.append("dmcTag",params.dmcTag); 
            formData.append("dmsName",params.dmsName); 
            formData.append("isAlive",params.isAlive);  
            formData.append("isOnline",params.isOnline);
            formData.append("orderAsc",params.orderAsc);  
            formData.append("orderColumn",params.orderColunm); 
            formData.append("serverType",params.serverType); 
            formData.append("curPage",params.curPage); 
            formData.append("pageSize",params.pageSize);    
        return HTTPUtil.post('/stream/dms/list',formData).then((res) => {  
            if(res){
                res = res.result;          
                //处理 请求success  
                dispatch({
                    type: DMS_LIST_TYPE,
                    res
                })
            } 
 
        },(res)=>{
             //TODO 处理请求fail     
        }) 
    }
}
// 获取dms区域弹窗列表数据
export const getDMSArea = (areaParams = { curPage: 1, pageSize: 10,upOrDown:'',dmsTag:''}) => {
    return (dispatch, getState) => {
        let formData = new FormData();  
            formData.append("dmsTag",areaParams.dmsTag); 
            formData.append("upOrDown",areaParams.upOrDown); 
            formData.append("curPage",areaParams.curPage); 
            formData.append("pageSize",areaParams.pageSize);
        return HTTPUtil.post('/stream/dms/areal-distribution',formData).then((res) => {  
            if(res){
                res = res.result;
            } 
            //处理 请求success  
                dispatch({
                    type: DMS_AREA,
                    res
                }) 
        },(res)=>{
             //TODO 处理请求fail     
        }) 
    }
}
// 获取服务器地址弹窗列表数据
export const getDMSAddress = (addressParams = { curPage: 1, pageSize: 10,dmsTag:''}) => {
    return (dispatch, getState) => {
        let formData = new FormData();  
            formData.append("dmsTag",addressParams.dmsTag); 
            formData.append("curPage",addressParams.curPage); 
            formData.append("pageSize",addressParams.pageSize);
        return HTTPUtil.post('/stream/dms/dms-service-list/get',formData).then((res) => {  
            if(res){
                res = res.result;
            } 
            //处理 请求success  
                dispatch({
                    type: DMS_ADDRESS,
                    res
                }) 
        },(res)=>{
             //TODO 处理请求fail     
        }) 
    }
}
// 获取错误列表弹窗列表数据
export const getError = (params = { curPage: 1, pageSize: 10,dmsTag:''}) => {
    return (dispatch, getState) => {
        let formData = new FormData();  
            formData.append("dmsTag",params.dmsTag); 
            formData.append("curPage",params.curPage); 
            formData.append("pageSize",params.pageSize);
        return HTTPUtil.post('/stream/dms/dms-error-list/get',formData).then((res) => { 
            if(res){
                res = res.result;
            } 
            //处理 请求success  
                dispatch({
                    type: DMS_ERROR,
                    res
                }) 
        },(res)=>{
             //TODO 处理请求fail     
        }) 
    }
}
// 获取错误列表重置
export const resetError = (params = { dmsTag:''}) => {
    return (dispatch, getState) => {
        return HTTPUtil.get('/stream/dms/error-num/update',params).then((res) => { 
            console.log(res);
            if(res.status === "000000000"){
                dispatch(getDMSData());
            } else{
                Modal.error({content:res.message});
            }
            //处理 请求success  
                dispatch({
                    type: ERROR_RESET,
                    res
                }) 
        },(res)=>{
             //TODO 处理请求fail     
        }) 
    }
}
// actions集合
export const actions = {
    getDMSData,
    getDMSArea,
    getDMSAddress,
    getError,
    resetError
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [DMS_LIST_TYPE]: (state, action) => {
        if(action.res){
            return Object.assign({}, state, 
                {
                    data:action.res.data,
                    pageCur:action.res.curPage,
                    pageDatas:action.res.totalDatas,
                    pages:action.res.totalPages
                })
        }else{
            return state;
        }  
    },
    [DMS_AREA]: (state, action) => {
        if(action.res){
            return Object.assign({}, state, {
                areaData:action.res.data,
                areaPageCur:action.res.curPage,
                areapageDatas:action.res.totalDatas,
            });
        }else{
            return state;
        }   
    },
    [DMS_ADDRESS]: (state, action) => {
        if(action.res){
            return Object.assign({}, state, {
                addressData:action.res.data,
                addressCur:action.res.curPage,
                addressPageDatas:action.res.totalDatas,
            });
        }else{
            return state;
        }   
    },
    [DMS_ERROR]: (state, action) => {
        if(action.res){
            return Object.assign({}, state, {
                errorData:action.res.data,
                errorCur:action.res.curPage,
                errorPageDatas:action.res.totalDatas,
            });
        }else{
            return state;
        }   
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    data: [],
    pageCur:'',
    pageDatas:'',
    areaData:[],
    areapageDatas:'',
    pages:'',
    addressData:[],
    addressPageDatas:'',
    areaPageCur:'',
    addressCur:'',
    errorData:[],
    errorCur:'',
    errorPageDatas:''
}
export default function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
