import React from 'react';
import {Table, Input, Icon, Button, Popconfirm ,Modal,Form,Col, Checkbox } from 'antd';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
let  data = [];
const Tableuser = React.createClass({
  
render(){
/*   const { doHeader } = this.props;
    if(doHeader&& doHeader.list){//填充数据
        for(let i=0;i<doHeader.list.length;i++){
            let bool = false;
            for(let j=0;j<data.length;j++){
                if(data[j].key == doHeader.list[i].key ){
                    bool = true;
                    break;
                }
            }
            if(!bool){
                data.push(doHeader.list[i]);
            }
        }
    }*/
   const columns = [{
      title: '用户名',
        dataIndex: 'username',
        width:'30%',
        key: 'username',
    }, {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: '手机',
      dataIndex: 'phonenum',
      key: 'phonenum',
    }, {
      title: '功能',
      dataIndex: 'func',
      key: 'func',
    }, {
      title: '操作',
      dataIndex: 'operation',
      width:'130px',
      key: 'operation',
        render: (text, record, index) => {
          return (   
          <div className="opt-user"> 
            <a href="javascript:void(0);" onClick={()=>this.props.modify(record)} >编辑</a>             
            <Popconfirm title="确定删除?" onConfirm={()=>this.props.deleteRow(record,index)}>
                    <a href="javascript:void(0);">删除</a>
                </Popconfirm>
                </div>
          );
          }
    }];
    return (
     
          <Table  dataSource={this.props.dataSource} columns={columns}/*columns={this.props.tableColumns}*/ />
      
    );
  }
});
export default Tableuser;


