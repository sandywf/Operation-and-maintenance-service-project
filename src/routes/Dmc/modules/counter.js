import HTTPUtil from '../../../utils/request';
import utils from '../../../utils/utils';
import { Modal } from 'antd';
// ------------------------------------
// Constants
// ------------------------------------
export const DMC_LIST_TYPE = 'DMC_LIST_TYPE'
// ------------------------------------
// Actions
// ------------------------------------
	
let headers = {'token':utils.wToken};

export const getDMCData = () => {
    return (dispatch, getState) => {
        // let formData = new FormData();  
        // if(pagination != undefined && filters != undefined  && sorter !=undefined){
        //     formData.append("activeStatus",filters.activeStatus); 
        //     formData.append("curPage",pagination.current); 
        //     formData.append("dmcName",filters.dmcName); 
        //     formData.append("orderAsc",sorter.order);  
        //     formData.append("orderColumn",sorter.columnKey); 
        //     formData.append("pageSize",pagination.pageSize);
        // }
        
        return HTTPUtil.post(utils.host+'/dmc/dmc-list','',headers).then((res) => {  
            //处理 请求success  
            if(res.status === '000000000' ){  
                dispatch({
                    type: DMC_LIST_TYPE,
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

export const actions = {
    getDMCData
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [DMC_LIST_TYPE]: (state, action) => {
        return {data:action.res.result.data};
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
