
import HTTPUtil from '../../../utils/request';
import { Modal } from 'antd';
// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT';
export const DMC_AREA = 'DMC_AREA';
export const SYNC_DATA = 'SYNC_DATA';
// ------------------------------------
// Actions
// ------------------------------------
export const getKHData = (params = { curPage: 1, pageSize: 20,dmcTag:'',dmsTag:'',isSync:'',sortsType:'',sortsKey:'',streamName:''}) => {
    return (dispatch, getState) => {
        let formData = new FormData();  
            formData.append("dmcTag",params.dmcTag); 
            formData.append("dmsTag",params.dmsTag); 
            formData.append("isSync",params.isSync);  
            formData.append("orderColunm",params.sortsKey); 
            formData.append("orderAsc",params.sortsType); 
            formData.append("streamName",params.streamName); 
            formData.append("curPage",params.curPage); 
            formData.append("pageSize",params.pageSize);
        return HTTPUtil.post('/stream/stream/list',formData).then((res) => {  
            if( res){
                res = res.result;
            }
            //处理 请求success  
                dispatch({
                    type: COUNTER_INCREMENT,
                    res
                }) 
        },(res)=>{
             //TODO 处理请求fail     
        }) 
    }
}

// 获取流区域弹窗列表数据
export const getArea = (areaParams = { curPage: 1, pageSize: 10,streamName:''}) => {
    return (dispatch, getState) => {
        let formData = new FormData();  
            formData.append("streamName",areaParams.streamName); 
            formData.append("curPage",areaParams.curPage); 
            formData.append("pageSize",areaParams.pageSize);
        return HTTPUtil.post('/stream/stream/area-list/get',formData).then((res) => {  
            if( res){
                res = res.result;
            }
            //处理 请求success  
                dispatch({
                    type: DMC_AREA,
                    res
                }) 
        },(res)=>{
             //TODO 处理请求fail     
        }) 
    }
}
// 获取同步路数弹窗列表数据
export const getSyncData = (params = { curPage: 1, pageSize: 10,streamName:''}) => {
    return (dispatch, getState) => {
        let formData = new FormData();  
            formData.append("streamName",params.streamName); 
            formData.append("curPage",params.curPage); 
            formData.append("pageSize",params.pageSize);
        return HTTPUtil.post('/stream/stream/sync-stream/list',formData).then((res) => {  
            if( res){
                res = res.result;
            }
            //处理 请求success  
                dispatch({
                    type: SYNC_DATA,
                    res
                }) 
        },(res)=>{
             //TODO 处理请求fail     
        }) 
    }
}

export const actions = {
  getKHData,
  getArea,
  getSyncData,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]: (state, action) => {
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
    [DMC_AREA]: (state, action) => {
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
    [SYNC_DATA]: (state, action) => {
        if(action.res){
            return Object.assign({}, state, {
                syncData:action.res.data,
                syncPageCur:action.res.curPage,
                syncpageDatas:action.res.totalDatas,
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
    areaPageCur:'',
    areapageDatas:'',
    pages:'',
    syncData:[],
    syncPageCur:'',
    syncpageDatas:'',
}
export default function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
