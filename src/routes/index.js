// We only need to import the modules necessary for initial render
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
import utils from '../utils/utils';
/*console.log(document.body.clientWidth);
if(document.body.clientWidth<=1360){
    document.body.overflowX="scroll"; 
}*/
// function requireAuth(nextState,replace,next) {
//     if(utils.wToken) {
//         replace({
//             pathname: '/',
//             state: {
//                 nextPathname: nextState.location.pathname
//             }
//         })
//     }else{
//         replace("/login")//如果token信息为空就直接到登录页面
//         next();
//     }
// }
function requireAuth(nextState, replace) {
    //  if (!auth.loggedIn()) {
	/**
	 * 模拟登陆 生成大于5的随机数 满足条件就视为后端登陆成功
	 *
	 * @returns {undefined}
	 */
	if (Math.random()*10 > 5) {
        replace({
            pathname: '/login',
            state: {
                nextPathname: nextState.location.pathname
            }
        })
    }
}
/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */
export const createRoutes = (store) => ({
    childRoutes: [LoginRoute(store), {
        path: '/',
        component: CoreLayout,
        indexRoute: Home,
        onEnter: requireAuth,
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
            Redirect
        ]
    }]


})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
