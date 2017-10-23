
import HTTPUtil from '../../../utils/request';
import { Modal } from 'antd';
// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'

// ------------------------------------
// Actions
// ------------------------------------
export const getKHData = (params = { curPage: 1, pageSize: 10,ip:'',sortsType:'',dmcTag:'',dmsTag:'',streamName:'',sortsKey:''}) => {
    return (dispatch, getState) => {
        let formData = new FormData();  
            params.ip && formData.append("ip",params.ip); 
            formData.append("dmcTag",params.dmcTag);  
            formData.append("dmsTag",params.dmsTag); 
            params.streamName && formData.append("streamName",params.streamName); 
            formData.append("orderColumn",params.sortsKey); 
            formData.append("orderAsc",params.sortsType); 
            formData.append("curPage",params.curPage); 
            formData.append("pageSize",params.pageSize);
        return HTTPUtil.post('/stream/subscription/list',formData).then((res) => { 
                //处理 请求success   
                if(res){
                    res = res.result;
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




export const actions = {
  getKHData,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]: (state, action) => {
    if(action.res){
        return {
            data:action.res.data,
            pageCur:action.res.curPage,
            pageDatas:action.res.totalDatas,
            pages:action.res.totalPages
        };
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
    data2:[],
    pages:''
}
export default function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
