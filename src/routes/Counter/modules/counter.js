const listData = {
    "data": [{
  key: '1',
  indIp:'3.1.1.1',
  indArea: '江苏-苏州',
  indDmc:'天津DMC',
  indDms:'天津DMS',
  indAct:'天津流，北京流',
  upActflow:22,
  indflow:'5.5Mbps',
  dActflow:'11',
  dClient:7,
  dflow:'1.5Mbps',
  packet:'7%',
}, {
  key: '2',
  indIp:'10.1.1.1',
  indArea: '江苏-苏州',
  indDmc:'天津DMC',
  indDms:'天津DMS',
  indAct:'天津流，北京流',
  upActflow:33,
  indflow:'1.5Mbps',
  dActflow:'5',
  dClient:7,
  dflow:'6.5Mbps',
  packet:'32%',
}, {
  key: '3',
  indIp:'13.1.1.1',
  indArea: '江苏-苏州',
  indDmc:'天津DMC',
  indDms:'天津DMS',
  indAct:'天津流，北京流',
  upActflow:4,
  indflow:'1.5Mbps',
  dActflow:'6',
  dClient:3,
  dflow:'1.5Mbps',
  packet:'3%',
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
