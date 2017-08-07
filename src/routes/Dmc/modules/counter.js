
const listData = {
    "data": [{
        "key": 1,
        "active": "活跃",
        "name": "John Brown",
        "dmsNum": 0,
        "atvnum": 3,
        "upflow": "120Mbps",
        "uparea": 44,
        "client": 34342,
        "ip": 12,
        "dflow": "1200Mbps",
        "darea": 3,
        "packet": "3%",
        "graph": 15,
    }, {
        "key": 2,
        "name": "Jim Green",
        "active": "不活跃",
        "dmsNum": 0,
        "atvnum": 34,
        "upflow": "12Mbps",
        "uparea": 44,
        "client": 34342,
        "ip": 33,
        "dflow": "1200Mbps",
        "darea": 3,
        "packet": "5%",
        "graph": 22,
    }, {
        "key": 3,
        "name": "Joe Black",
        "active": "不活跃",
        "dmsNum": 0,
        "atvnum": 4,
        "upflow": "20Mbps",
        "uparea": 44,
        "client": 34342,
        "ip": 163,
        "dflow": "1200Mbps",
        "darea": 3,
        "packet": "8%",
        "graph": 51,
    }, {
        "key": 4,
        "name": "Jim Red",
        "active": "活跃",
        "dmsNum": 0,
        "atvnum": 5,
        "upflow": "19Mbps",
        "uparea": 44,
        "client": 34342,
        "ip": 76,
        "dflow": "1200Mbps",
        "darea": 3,
        "packet": "33%",
        "graph": 54,
    }]
}
const testValue = {
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
export const DMC_LIST_TYPE = 'DMC_LIST_TYPE'

// TEST
export const DMC_AREA_TYPE = 'DMC_AREA_TYPE'

// SEARCH
export const SEARCH_FILTER = 'SEARCH_FILTER'
// ------------------------------------
// Actions
// ------------------------------------
/*export function getDMCData2() {
    return {
        type: DMC_LIST_TYPE,
        payload: []
    }
}*/

/*  This is a thunk, meaning it is a function that immediately
 returns a function for lazy evaluation. It is incredibly useful for
 creating async actions, especially when combined with redux-thunk! */
	

export const getDMCData = () => {
    return (dispatch, getState) => {

        /*return fetch("/api/usersList").then(response => {*/
            dispatch({
                type: DMC_LIST_TYPE,
                payload: listData
            })

        /*})*/

        /*
		return new Promise((resolve) => {
			// 这里可以是异步方法	
            dispatch({
                type: DMC_LIST_TYPE,
                payload: listData
            })
            resolve()
        })*/
    }
}
// TEST
export const getTestData = () =>{
    return (dispatch, getState) => {
    dispatch({
                type: DMC_AREA_TYPE,
                payload: testValue
            });

    }
}
//SEARCH
export const getFilter = (filter) =>{
    return (dispatch, getState) => {
    dispatch({
                type: SEARCH_FILTER,
                filter
            });

    }
}

export const actions = {
    getDMCData,
	getTestData,
    getFilter
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [DMC_LIST_TYPE]: (state, action) => {
        state = Object.assign(state, action.payload)
        return Object.create(state);
    },
    [DMC_AREA_TYPE]: (state, action) => {
        state = Object.assign(state, action.payload)
        return Object.create(state)
    },
    [SEARCH_FILTER]:(state, action)=>{
        return action.filter
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
