import React from 'react'
import { IndexLink, Link ,browserHistory} from 'react-router'
/*import '../../../node_modules/antd/dist/antd.css'*/
import '../../public/_module/css/base.css'
import '../../public/_module/js/common.js'
import './Header.css'
import { Tabs } from 'antd'
import Logo from '../../public/_module/images/logo.png'
import HTTPUtil from '../../utils/request';
const TabPane = Tabs.TabPane
const tabs=[
    {
      show:'',
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
      show:'',
      icon:'iconfont icon-allocation',
      name:'配置',
      Children:[
          {path: "/user", name: "用户列表"},
          {path: "/personal", name: "个人资料"},
    ]}
];
function callback(key) {

  console.log(key);
  
};
let headers = { 
  'token': sessionStorage.getItem('token')
};
function eidtPwd(){
  HTTPUtil.post('http://10.5.224.23:8181/MaintenanceSystem/user/loginout','',headers).then((json) => {  
    //处理 请求success  
    if(json.status === '000000000' ){  
            browserHistory.push('/login')  
        }else{  
             //处理自定义异常  
           alert(json.message);
        }  
    },(json)=>{
     //TODO 处理请求fail  
  })  
}

export const Header = () => (
  <div className="header">
    <div className="head-warp">
      <div className="logo">
       <img alt='' src={Logo} />
      </div>
      <div className="menu-nav">
         <Tabs defaultActiveKey="0" onChange={callback}>
          {tabs.map((item,i)=>{
            return <TabPane defaultActiveKey="0"  disabled={item.show} tab={ <span><i className={item.icon}></i> {item.name}</span> } key={i}>
              {item.Children.map(function(item,index){
                return <Link key={index} to={item.path} activeClassName='route--active'>
                          {item.name}
                        </Link>
              })}
             </TabPane>
          })}
        </Tabs>
      </div>
      <div className="log-out"><span>Hi,某某某</span>
      <a href="javascript:;" onClick={eidtPwd}><i className="iconfont icon-Close-Button"></i></a></div>
    </div>
  </div>
)
export default Header
