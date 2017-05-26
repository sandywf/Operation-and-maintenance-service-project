const listData = {
    "data": [{
  key: '1',
  flowName:'天津流',
  name: '天津DMC',
  dmsname:'天津DMS',
  synchro:'同步',
  starttime:'2016-12-13 09:12:22',
  resolving:'1920*1080',
  frameRate:23,
  upflow:'120Mbps',
  upClient:'10.11.25.1:40',
  uparea:'江苏-苏州',
  downClient:'12',
  ip: 153,
  dFlow: '3.5Mbps',
  dArea: 7,
  dPacket: '8%',
  graph: 15,
  synch:55,
  synchFlow:'3Mbps',
  synchPacket:'3%'
}, {
  key: '2',
  flowName:'天津流',
  name: '天津DMC',
  dmsname:'天津DMS',
  synchro:'同步',
  starttime:'2016-12-13 09:12:22',
  resolving:'1920*1080',
  frameRate:10,
  upflow:'120Mbps',
  upClient:'10.11.25.1:40',
  uparea:'江苏-苏州',
  downClient:'12',
  ip: 13,
  dFlow: '3.5Mbps',
  dArea: 0,
  dPacket: '37%',
  graph: 95,
  synch:86,
  synchFlow:'33Mbps',
  synchPacket:'3%'
}, {
  key: '3',
   flowName:'天津流',
  name: '天津DMC',
  dmsname:'天津DMS',
  synchro:'上传',
  starttime:'2016-12-13 09:12:22',
  resolving:'1920*1080',
  frameRate:44,
  upflow:'120Mbps',
  upClient:'10.11.25.1:40',
  uparea:'江苏-苏州',
  downClient:'12',
  ip: 153,
  dFlow: '3.5Mbps',
  dArea: 3,
  dPacket: '3%',
  graph: 15,
  synch:2,
  synchFlow:'3Mbps',
  synchPacket:'3%'
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
