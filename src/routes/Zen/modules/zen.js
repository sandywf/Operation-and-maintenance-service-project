const listData = {
    "data": [{
  key: '1',
  cClient:'10.1.1.1',
  cDmc:'天津DMC',
  cDms:'天津DMS',
  cFlow:'天津流',
  cIp:'1.1.23.4',
  flowTime:'2016-12-12 09:12:34',
  clientTime:'2016-12-12 09:12:34',
  cResolve:'1920*1080',
  cRate:'23',
  dFlow:'1.4Mbps',
  cArea:'江苏-苏州',
  packet:'3%',
}, {
  key: '2',
  cClient:'10.1.1.1',
  cDmc:'好DMC',
  cDms:'天津DMS',
  cFlow:'北京流',
  cIp:'2.7.23.4',
  flowTime:'2016-12-12 09:12:34',
  clientTime:'2016-12-12 09:12:34',
  cResolve:'1900*1080',
  cRate:'17',
  dFlow:'8.4Mbps',
  cArea:'江苏-苏州',
  packet:'3%',
}, {
  key: '3',
  cClient:'10.1.1.1',
  cDmc:'苏州DMC',
  cDms:'天津DMS',
  cFlow:'苏州流',
  cIp:'1.3.23.4',
  flowTime:'2016-12-12 09:12:34',
  clientTime:'2016-12-12 09:12:34',
  cResolve:'1920*1080',
  cRate:'77',
  dFlow:'4.4Mbps',
  cArea:'江苏-苏州',
  packet:'34%',
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
