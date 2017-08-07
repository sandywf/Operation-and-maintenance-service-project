import React from 'react';
import {Table, Input, Icon, Button, Popconfirm ,Modal,Form,Col, Checkbox } from 'antd';
import './userlist.css';
import Modalss from './modal';
import Tableuser from './table';

const EditableTable = React.createClass({
/*class EditableTable extends React.Component {*/
   /*constructor(props) {
        super(props);
        this.state = {
          data:this.props.data,
          isVisible:false,
          title:'',
          current:[]
        }
    }*/
    getInitialState() {
    return {
       data:this.props.data,
       isVisible:false,
       title:'',
       current:[]
    };
  },
  /*真实的DOM被渲染出来后调用*/
  componentDidMount(){
    if(!this.props.data || !this.props.data.listData){
      this.props.getKHData();
    }
  },
  /*组件接收到新的props时调用*/
  componentWillReceiveProps(props){ 
    this.setState({data:props.data});
  },
  addUser(e){
    this.setState({isVisible:true,title:"添加用户"});
    let current = {modalType:"add"};
    this.setState({current:current});
    const a = [];
    this.props.showModal({current,a});
  },
  handleModify(record){
    let  data = this.props.data;
    record.modalType = "modify";
    this.setState({isVisible:true,title:"编辑用户"});
    let current = record;
      this.setState({current:current});
    this.props.showModal({current,data});
  },
  onDelete(record,index){
    const dataSource = this.props.data;
    this.props.doDelete({record,dataSource});
    this.setState({ dataSource });
  },
  handleCancel(e){
    this.setState({isVisible:false});
  },
render(){
		return (
			<div id="user">
				<h4 className="ms-overall">
					<strong>用户列表</strong> 
					<i className="iconfont icon-Full-screen"></i> 
					<i>全屏</i>
					<button className="ms-userbtn" onClick={()=>this.addUser()}> 创建用户 </button>
				</h4>
				<Modalss visible={this.state.isVisible} doAdd = {this.props.doAdd} doModify = {this.props.doModify} current= {this.state.current} data={this.state.data} title={this.state.title} del = {()=>this.handleCancel()} />
		    <Tableuser  dataSource={this.state.data} modify = {this.handleModify} deleteRow = {this.onDelete} />
	  	</div>
		);
	}
});
export default EditableTable;



