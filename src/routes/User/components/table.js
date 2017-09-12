import React from 'react';
import {Table, Input, Icon, Button, Popconfirm ,Modal,Form,Col, Checkbox } from 'antd';
let  dataSource = [];
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

class Tableuser extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    const { dataSource } = this.props;
   const columns = [{
        title: '用户名',
        dataIndex: 'username',
        width:'30%',
        key: 'username',
    }, {
      title: '姓名',
      dataIndex: 'realname',
      key: 'realname',
    }, {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: '手机',
      dataIndex: 'tel',
      key: 'tel',
    }, {
      title: '功能',
      dataIndex: 'functions',
      key: 'functions',
      render: (text, record, index) => {
        var data = record.functions.map((item,i)=>{
          return item.functionName;
        });
        return (data);
      }
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
     
          <Table  dataSource={dataSource} columns={columns} rowKey={record => record.userId} pagination={false} />
      
    );
  }
};
export default Tableuser;


