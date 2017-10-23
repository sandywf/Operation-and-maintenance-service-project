// We only need to import the modules necessary for initial render
import React from 'react'
import { Route,IndexRoute} from 'react-router'
//import HTTPUtil from '../utils/request';

import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import CounterRoute from './Counter'
import ZenRoute from './Zen'
import ElapseRoute from './Elapse'
import RouteRoute from './Route'
import PageNotFound from './PageNotFound'
import Dms from './Dms'
import Dmc from './Dmc'
import Flow from './Flow'
import User from './User'
import Personal from './Personal'
import LoginRoute from './Login'
import Redirect from './PageNotFound/redirect'

/**  加载本系统的图标库  **/
import '../public/icon/iconfont.css'
// 引入标准Fetch及IE兼容依赖
import 'whatwg-fetch';
import 'es6-promise/dist/es6-promise.min.js';
import 'fetch-ie8/fetch.js';
import  'babel-plugin-import';

/* 进入路由的判断*/
function isLogin(nextState, replaceState) {
    if (!(localStorage.getItem('token')) ){
      replaceState('/login')
    }
  }
    export const createRoutes = (store) => ([{ 
            path: '/',
            component   :CoreLayout,
            indexRoute  : Home(store),
            onEnter:isLogin,
            childRoutes: [
                CounterRoute(store),
                ZenRoute(store),
                ElapseRoute(store),
                RouteRoute(store),
                Dms(store),
                Dmc(store),
                Flow(store),
                User(store),
                Personal(store),
                PageNotFound(),
            ]
        },
        LoginRoute(store),
        Redirect
    ])
export default createRoutes
