import HTTPUtil from '../../../utils/request';
import { Modal } from 'antd';

// ------------------------------------
// Constants
// ------------------------------------
export const DMC_LIST_TYPE = 'DMC_LIST_TYPE';
export const DMC_AREA = 'DMC_AREA';
// ------------------------------------
// Actions
// ------------------------------------
// 获取dmc列表数据
export const getDMCData = (params = { curPage: 1, pageSize: 20,activeStatus:'',dmcName:'',sortsType:'',sortsKey:''}) => {
    return (dispatch, getState) => {
        let formData = new FormData();  
            formData.append("activeStatus",params.activeStatus); 
            formData.append("dmcName",params.dmcName); 
            formData.append("orderAsc",params.sortsType);  
            formData.append("orderColumn",params.sortsKey); 
            formData.append("curPage",params.curPage); 
            formData.append("pageSize",params.pageSize);
        return HTTPUtil.post('/dmc/dmc-list',formData).then((res) => {  
                res = res.result;
            //处理 请求success  
                dispatch({
                    type: DMC_LIST_TYPE,
                    res
                }) 
        },(res)=>{
             //TODO 处理请求fail     
        }) 
    }
}
// 获取dmc区域弹窗列表数据
export const getDMCArea = (areaParams = { curPage: 1, pageSize: 10,upOrDown:'',dmcTag:''}) => {
    return (dispatch, getState) => {
        let formData = new FormData();  
            formData.append("dmcTag",areaParams.dmcTag); 
            formData.append("upOrDown",areaParams.upOrDown); 
            formData.append("curPage",areaParams.curPage); 
            formData.append("pageSize",areaParams.pageSize);
        return HTTPUtil.post('/dmc/areal-distribution',formData).then((res) => {  
                res = res.result;
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
export const actions = {
    getDMCData,
    getDMCArea
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [DMC_LIST_TYPE]: (state, action) => {
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
                areaCur:action.res.curPage,
                areapageDatas:action.res.totalDatas,
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
    areaCur:''
}
export default function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
