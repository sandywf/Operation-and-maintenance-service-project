// ------------------------------------
// Constants
// ------------------------------------
import moment from 'moment';
import HTTPUtil from '../../../utils/request';
import { Modal } from 'antd';
// 根据dmctag获取dms
export const DMS_STREM = 'DMS_STREM';
export const ELAPSE = 'ELAPSE';

// ------------------------------------
// Actions
// ------------------------------------
// 根据dmc获取dms值
export const getDms = (params = { dmcTag:''}) => {
  return (dispatch, getState) => {
      let formData = new FormData();  
        formData.append("dmcTag",params.dmcTag); 
      return HTTPUtil.post('/stream/dms/get',formData).then((res) => { 
          if(res){
             res = res.result;
              //处理 请求success  
              dispatch({
                type: DMS_STREM,
                res
            }) 
          } 
      },(res)=>{
           //TODO 处理请求fail     
      }) 
  }
}
// 获取图表数据
export const getElapse = (params = { dotNum: 6,xAxisTimeFormat:'YYYY-MM-dd HH:mm:ss',timeUnit:'MINUTE',timeNum:5,endTime:moment().format('x')}) => {
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
        console.log(formData);
        return HTTPUtil.post('/stream/globalview/graph',formData).then((res) => {  
            if(res){
                 res = res.result;
                //处理 请求success  
                dispatch({
                    type: ELAPSE,
                    res
                }) 
            }         
        },(res)=>{
             //TODO 处理请求fail     
        }) 
    }
}
export const actions = {
  getDms,
  getElapse
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [DMS_STREM]: (state, action) => {
      if(action.res){
          return Object.assign({}, state, 
              {
                  dmsData:action.res,
              })
      }else{
          return state;
      }  
    },
    [ELAPSE]: (state, action) => {
        if(action.res){
            return Object.assign({}, state, 
                {
                    flowData:action.res,
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
  dmsData: [],
  flowData:[]
}
export default function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
