import React from 'react'
import { hashHistory,IndexLink, Link ,browserHistory} from 'react-router';
import {createHashHistory} from 'history';
var routerHistory =  require('react-router').useRouterHistory;  
const appHistory = routerHistory(createHashHistory)({queryKey:false});  

import '../../public/_module/css/base.css'
import '../../public/_module/js/common.js'
import './Header.css'
import { Tabs } from 'antd'
import Logo from '../../public/_module/images/main-logo.png'
import HTTPUtil from '../../utils/request';
const TabPane = Tabs.TabPane
var userItem = [],userShow='disabled',flowShow='disabled',activeTag="0";
function callback(key) {
  key == '0' && appHistory.push('/');
  key == '5' && appHistory.push('/user');
  activeTag=key;
};
function eidtPwd(){
  HTTPUtil.post('/user/loginout','').then((json) => {  
    //处理 请求success  
      localStorage.clear();
      appHistory.push('/login');
    },(json)=>{
     //TODO 处理请求fail  
  })  
}
class Header extends React.Component {
  componentWillMount(){
      if(localStorage.getItem('userType')==='normal_user'){
          userItem = [
            {path: "/personal", name: "个人资料"},
          ]
      }else{
          userItem = [
            {path: "/user", name: "用户列表"},
            {path: "/personal", name: "个人资料"},
          ]
      }
      if(localStorage.getItem('funcTag') == 'all'){
          userShow='';
          flowShow='';
      }else if(localStorage.getItem('funcTag') == 'user'){
          userShow='';
          flowShow='disabled';
          if((location.hash).includes('personal')){
              appHistory.push('personal');
          }else{
            appHistory.push('user');
          }
      }else{
          flowShow='';
          userShow='disabled';
      }
      if(location.href.includes('user') || location.href.includes('personal')){
        activeTag="5";
      }else{
        activeTag="0";
      }
  }
  render(){
    const tabs=[
    {
      show:flowShow,
      icon:'iconfont icon-Streaming-Server',
      name:'流媒体服务器',
      Children:[
        {path: "/", name: "全局"},
        {path: "/dmc", name: "DMC"},
        {path: "/dms", name: "DMS"},
        {path: "/flow", name: "流"},
        {path: "/independentIp", name: "独立IP"},
        {path: "/zen", name: "订阅客户端"},
        {path: "/elapse", name: "图形"},
      ]
    },
    {
      show:'disabled',
      icon:'iconfont icon-Transformation-Server',
      name:'转换服务器',
      Children:[
    ]},
    {
      show:'disabled',
      icon:'iconfont icon-Asset-Server',
      name:'资源服务器',
      Children:[
    ]},
    {
      show:'disabled',
      icon:'iconfont icon-Coco',
      name:'CoCo',
      Children:[
    ]},
    {
      
      show:'disabled',
      icon:'iconfont icon-physical-server',
      name:'物理服务器',
      Children:[
    ]},
    {
      show:userShow,
      icon:'iconfont icon-allocation',
      name:'配置',
      Children:userItem
    }
];
			return(
  <div className="header">
    <div className="head-warp">
      <div className="logo">
       <img alt='logo' src={Logo} />
      </div>
      <div className="menu-nav">
         <Tabs onChange={callback} activeKey={activeTag}>
          {tabs.map((item,i)=>{
            return <TabPane defaultActiveKey={0} disabled={item.show} tab={ <span><i className={item.icon}></i> {item.name}</span> } key={i}>
              {item.Children.map(function(item,index){
                return <IndexLink key={index} to={item.path} activeClassName='route--active'>
                          {item.name}
                        </IndexLink >
              })}
             </TabPane>
          })}
        </Tabs>
      </div>
      <div className="log-out"><span>Hi,{localStorage.getItem('realname')}</span>
      <a href="javascript:;" onClick={eidtPwd}><i className="iconfont icon-Close-Button"></i></a></div>
    </div>
  </div>
);
}
}
export default Header;