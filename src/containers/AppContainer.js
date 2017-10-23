import React, { Component, PropTypes } from 'react'
import { hashHistory, browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux';
import {createHashHistory} from 'history';
var routerHistory =  require('react-router').useRouterHistory;  
const appHistory = routerHistory(createHashHistory)({queryKey:false});  


class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.array.isRequired,
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={appHistory} children={routes} />
        </div>
      </Provider>
    )
  }
}

export default AppContainer
