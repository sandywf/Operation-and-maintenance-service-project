import React from 'react';
import {Button, Input} from 'antd';
import './person.css';
import Pmodal from './modal';
const Personal = React.createClass({
	getInitialState() {
    	return {
    	  modalVisible:false
    	}
  	},
	colse(){this.setState({modalVisible:false})},
  	sub(){this.setState({modalVisible:false})},
  	render() {
  		return (
  			<div id="personal">
				<h4 className="ms-overall">
					<strong>个人资料</strong> 
					<i className="iconfont icon-Full-screen"></i> 
					<i>全屏</i>
				</h4>
				<div className="container linear">
					<ul className="ms-person">
						<li><label>用户名：</label><span>12121</span> </li>
						<li><label>姓名：</label><span>12121</span> </li>
						<li><label>邮箱：</label><span>12121</span> </li>
						<li><label>手机：</label><span>12121</span> </li>
						<li><label>密码：</label>
							<span>12121</span>
							<Button onClick={()=> this.setState({modalVisible:true})}>修改密码</Button> </li>
					</ul>
				</div>
	 			<Pmodal modalVisible={this.state.modalVisible} handleOk={this.sub} handleCancel={this.colse}/>
      		</div>
    	);
  	}
});
export default Personal;
