import React from 'react';
import {Table, Input, Icon, Button, Popconfirm ,Modal,Form,Col, Checkbox } from 'antd';
import './userlist.css';
import Modalss from './modal';
import Tableuser from './table';
import FormatUtils from '../../../public/_module/js/common.js';

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isVisible:false,
          title:'',
          current:[],
          data:[],
          userId:'',
          key:Math.random(),
          password:'666666',
          status:false
        }
    }
  /*真实的DOM被渲染出来后调用*/
  componentDidMount(){
      this.props.getKHData();
  }
  /*组件接收到新的props时调用*/
  componentWillReceiveProps(nextProps){ 
    if (this.props.data !== nextProps.data) {
      this.setState({data:nextProps.data});
    } 
  }        
  addUser=()=>{
    let newKey = parseInt(3 * Math.random());
    this.setState({ key: newKey });
    this.setState({isVisible:true,title:"添加用户"});
    let current = {modalType:"add"};
    this.setState({current:current});
    let  data = this.props.data;
    this.props.showModal({current,data});
  }
  handleModify=(record)=>{
    let newKey = parseInt(4 * Math.random());
    this.setState({ key: newKey });
    let  data = this.props.data;
    record.modalType = "modify";
    this.setState({ editType: true });
    this.setState({isVisible:true,title:"编辑用户"});
    let current = record;
    this.setState({current:current,userId:current.userId});
    let func = [];
    current.functions.forEach(function(item){
        func[func.length] = item.functionId;
    });
    current.functions = func;
    this.props.showModal({current,data});
  }
  onDelete=(record,index)=>{
    let data = this.props.data;
    this.props.doDelete({record,data});
    this.setState({ userId:record.userId});
  }
  handleCancel=()=>{
    this.setState({isVisible:false});
    this.setState({password:'666666'});
    this.props.getKHData();
  }
  fullScreen=(e)=>{
    this.setState({status:!this.state.status});
    var elem = document.getElementById('user');   
    FormatUtils.requestFullScreen(elem,this.state.status);
  }
  pwdEdit=(value)=>{
    this.setState({password:value});
  }
render(){
  const { data } = this.props;
		return (
			<div id="user">
				<h4 className="ms-overall">
					<strong>用户列表</strong> 
            <i className="iconfont icon-Full-screen" onClick={this.fullScreen}></i> 
            <i>全屏</i>
            <button className="ms-userbtn" onClick={()=>this.addUser()}> 创建用户 </button>
				</h4>
				<Modalss password={this.state.password} pwdEdit={this.pwdEdit} newKey={this.state.key} userId = {this.state.userId} show={this.handleCancel} setVisible={this.state.isVisible} doAdd = {this.props.doAdd} doModify = {this.props.doModify} current= {this.state.current} data={this.state.data} title={this.state.title} del = {this.handleCancel} />
		    <Tableuser dataSour={this.state.data} modify = {this.handleModify} deleteRow = {this.onDelete} />
	  	</div>
		);
	}
}
export default EditableTable;



