const listData = {
  "data":  [{
  key: '1',
  active:'活跃',
  online:'在线',
  dmsname:'天津DMS',
  name: 'John Brown',
  domain:44,
  server:'互动',
  svraddress:'5',
  msg:44,
  activenum:5,
  upflow:'1200Mbps',
  uparea:3,
  client:'21122',
  ip: 1235,
  dflow:'1200Mbps',
  darea:'5',
  packet:'34%',
  graph:'图形',
  operate:'操作'
}, {
  key: '2',
  active:'不活跃',
  online:'不在线',
  dmsname:'DMS',
  name: 'Joe Srown',
  domain:42,
  server:'互动观摩',
  svraddress:'5',
  msg:0,
  activenum:5,
  upflow:'1200Mbps',
  uparea:3,
  client:'21122',
  ip: 24,
  dflow:'1200Mbps',
  darea:'5',
  packet:'3%',
  graph:'图形',
  operate:'操作'
}, {
  key: '3',
  active:'不活跃',
  online:'不在线',
  dmsname:'北京',
  name: 'Joe Black',
  domain:3,
  server:'互动观摩',
  svraddress:'5',
  msg:0,
  activenum:3,
  upflow:'100Mbps',
  uparea:3,
  client:'21122',
  ip: 2234,
  dflow:'200Mbps',
  darea:'5',
  packet:'0',
  graph:'图形',
  operate:'操作'
}]
}

const freshMenu = {
    "data2": [{
          key: '1',
          name: '胡彦斌',
          age: 32,
        }, {
          key: '2',
          name: '胡彦祖',
          age: 42,
    }]
}
// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const COUNTER_MENU = 'COUNTER_MENU'
// ------------------------------------
// Actions
// ------------------------------------
/*
export const getKHData = () => {
    return (dispatch, getState) => {
        return fetch('https://randomuser.me/api')
        .then(res => res.json())
        .then(json => dispatch({ type: 'COUNTER_INCREMENT', payload: json }));
  }
    }*/

export const getKHData = () => {
    return (dispatch, getState) => {
        return fetch("https://api.github.com/users/suncn").then(response => {
            dispatch({
                type: COUNTER_INCREMENT,
                payload: listData
            })
        })
    }
}


export const getMENUData = () => {
    return (dispatch, getState) => {
        return fetch("https://api.github.com/users/suncn").then(response => {
            dispatch({
                type: COUNTER_MENU,
                payload: freshMenu
            })
        })
    }
}

export const actions = {
  getKHData,
  getMENUData
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]: (state, action) => {
    state = Object.assign(state, action.payload)
    return Object.create(state);
  },
  [COUNTER_MENU]: (state, action) => {
    state = Object.assign(state, action.payload)
    return Object.create(state);
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    data: [],
}
export default function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
