import React from 'react';
import {Button, Input} from 'antd';
import './person.css';
import Pmodal from './modal';
import FormatUtils from '../../../public/_module/js/common.js';
class Personal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			modalVisible:false,
			data:this.props.data,
			key:1,
			status:false
        }
    }
	   /*真实的DOM被渲染出来后调用*/
  	componentDidMount(){
		this.props.person();
	}
	/*组件接收到新的props时调用*/
	componentWillReceiveProps(props){ 
		this.setState({data:props.data});
	}
	colse=()=>{
		this.setState({modalVisible:false})
	}
  	sub=(e)=>{
		this.setState({modalVisible:false});
	}
	editPwd=()=>{
		this.setState({modalVisible:true});
		let newKey = parseInt(10 * Math.random());
		this.setState({ key: newKey });
	}

	fullScreen=(e)=>{
		this.setState({status:!this.state.status});
		var elem = document.getElementById('personal');   
		FormatUtils.requestFullScreen(elem,this.state.status);
	}
  	render() {
  		return (
  			<div id="personal">
				<h4 className="ms-overall">
					<strong>个人资料</strong> 
					<i className="iconfont icon-Full-screen"  onClick={ this.fullScreen}></i> 
					<i>全屏</i>
				</h4>
				<div className="container linear">
					<ul className="ms-person">
						<li><label>用户名：</label><span>{this.props.data.username}</span> </li>
						<li><label>姓名：</label><span>{this.props.data.realname}</span> </li>
						<li><label>邮箱：</label><span>{this.props.data.email}</span> </li>
						<li><label>手机：</label><span>{this.props.data.tel}</span> </li>
						<li><label>密码：</label>
							<span></span>
							<Button onClick={this.editPwd}>修改密码</Button> </li>
					</ul>
				</div>
	 			<Pmodal key={this.state.key} data={this.state.data} show={this.colse} userId = {this.props.data.userId} updatePwd = {this.props.updatePwd} modalVisible={this.state.modalVisible} handleOk={this.sub} handleCancel={this.colse}/>
      		</div>
    	);
  	}
};
export default Personal;
