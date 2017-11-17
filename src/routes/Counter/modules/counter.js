
import HTTPUtil from '../../../utils/request';
// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'

export const IP_FLOW = 'IP_FLOW'

// ------------------------------------
// Actions
// ------------------------------------

export const getKHData = (params = { curPage: 1, pageSize: 20,dmcTag:'',dmsTag:'',ip:'',streamName:'',sortsType:'',sortsKey:''}) => {
    return (dispatch, getState) => {
        let formData = new FormData();  
            formData.append("dmcTag",params.dmcTag); 
            formData.append("dmsTag",params.dmsTag); 
            formData.append("ip",params.ip); 
            formData.append("streamName",params.streamName);   
            formData.append("orderAsc",params.sortsType);  
            formData.append("orderColumn",params.sortsKey); 
            formData.append("curPage",params.curPage); 
            formData.append("pageSize",params.pageSize);
        return HTTPUtil.post('/stream/ip/list',formData).then((res) => {  
            if(res){
                res = res.result;
                //处理 请求success  
                dispatch({
                    type: COUNTER_INCREMENT,
                    res
                }) 
            }  
        },(res)=>{
             //TODO 处理请求fail     
        }) 
    }
}
// ip列表上下行活跃流信息
export const getFlowData = (params = {ip:'',upOrDown:'down'}) => {
    return (dispatch, getState) => {
        let formData = new FormData();  
            formData.append("upOrDown",params.upOrDown); 
            formData.append("ip",params.ip);  
        return HTTPUtil.post('/stream/ip/stream-name',formData).then((res) => {  
             if(res){
                res = res.result;
                //处理 请求success  
                dispatch({
                    type: IP_FLOW,
                    res
                }) 
            }
        },(res)=>{
             //TODO 处理请求fail     
        }) 
    }
}


export const actions = {
  getKHData,
  getFlowData
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]: (state, action) => {
    if(action.res){
         return Object.assign({}, state, {
            data:action.res.data,
            pageCur:action.res.curPage,
            pageDatas:action.res.totalDatas,
            pages:action.res.totalPages
         });
    }else{
        return state;
    }
  },
  [IP_FLOW]: (state, action) => {
    if(action.res){
         return Object.assign({}, state, {
            flowData:action.res,
         });
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
    pageCur:'',
    pageDatas:'',
    pages:'',
    flowData:[],
}
export default function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
