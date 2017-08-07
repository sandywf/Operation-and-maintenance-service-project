const listData = {
  "data": [{
        key: '0',
        username:"hnghvmju",
          name: '姓名1',
          email: 'youxiang@126.com',
          phonenum: '15507765432',
          func: 'user',
          password:'5676757'
        },{
          key: '1',
        username:"hnghvmju",
          name: '姓名2',
          email: 'youxiang@163.com',
          phonenum: '15507765432',
          func: 'server',
          password:'5676757'
        },{
          key: '2',
        username:"hnghvmju",
          name: '姓名3',
          email: 'youxiang@163.com',
          phonenum: '15507765432',
          func: 'server',
          password:'5676757'
      }]
}
// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const DO_DELETE = 'DO_DELETE'
export const SHOW_MODAL = 'SHOW_MODAL'
export const DO_ADD = 'DO_ADD'
export const DO_MODIFY = 'DO_MODIFY'
// ------------------------------------
// Actions
// ------------------------------------
export const getKHData = () => {
    return (dispatch, getState) => {
        return fetch("https://api.github.com/users/suncn").then(response => {
            dispatch({
                type: COUNTER_INCREMENT,
                payload: listData.data
            })
        })
    }
}
//添加一条记录
export const doAdd = ({current,data})=>{
    current.key = Math.random(10)+"tcf";
    
    /*data.push(current);
    const list = data;*/
    return {
        type:DO_ADD,
        current
    }
}
//修改记录
export const doModify = ({current,data})=>{
    for(let i=0;i<data.length;i++){
        if(current.key == data[i].key){
            data[i] = current;
            
            break;
        }
    }
    const list = data;
    return {
        type:DO_MODIFY,
        list
    }
}
//删除记录
export const doDelete = ({record,dataSource})=>{
  var data = dataSource;
   for(let i=0;i<data.length;i++){
        if(data[i].key == record.key){
            data.splice(i,1);
            break;
        }
    }
    let list = data;
    return {
        type:DO_DELETE,
        list 
    }
}

//弹窗处理逻辑
export const showModal = ({current,data})=>{
    
    if(current.modalType == "add"){
        const temp = {};
        temp.title = current.title;
        temp.key = current.key;
        temp.modalType = current.modalType;
        current = temp;
    }else if(current.modalType == "modify"){
    }
    return {
        type:SHOW_MODAL,
        current,
        data
    }
    
}

export const actions = {
  getKHData,
  doDelete,
  showModal,
  doAdd,
  doModify
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]: (state, action) => {
    state.data = action.payload; 
    return state;
  },
  [DO_DELETE]: (state, action) => {
    return {"list":action.list};
  },
  [SHOW_MODAL]: (state, action) => {
    state = Object.assign({current:{"title":"添加"},data:[]}, action);
    return Object.create({current:action.current,data:action.data});
  },
  [DO_ADD]: (state, action) => {
    state.data.push(action.current);
    return state;
  },
  [DO_MODIFY]: (state, action) => {
    return {"list":action.list};
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
/*const initialState*/
const initialState = {
    data: [],
    current:[]
}
export default function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
