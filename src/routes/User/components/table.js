import React from 'react';
import {Table, Input, Icon, Button, Popconfirm ,Modal,Form,Col, Checkbox } from 'antd';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

class Tableuser extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
      const columns = [{
          title: '用户名',
          dataIndex: 'username',
          width:'30%',
        }, {
          title: '姓名',
          dataIndex: 'realname',
        }, {
          title: '邮箱',
          dataIndex: 'email',
        }, {
          title: '手机',
          dataIndex: 'tel',
        }, {
          title: '功能',
          dataIndex: 'functions',
          render: (text, record, index) => {
            var data = record.functions && record.functions.map((item,i)=>{
              return <i className="m5" key={i}>{item.functionName}</i>;
            });
            return (data);
          }
        }, {
          title: '操作',
          dataIndex: 'operations',
          width:'130px',
            render: (text, record, index) => {
              var data=record.operations.map((item,i)=>{
                  return (   
                    <div className="opt-user" key={i}>
                      {item =='modify' ? <a href="javascript:void(0);" onClick={()=>this.props.modify(record)} >编辑</a> :''}            
                      {item =='delete' ?  <Popconfirm title="确定删除?" onConfirm={()=>this.props.deleteRow(record,index)}>
                      <a href="javascript:void(0);">删除</a>
                      </Popconfirm> :''}
                    </div>
                  )
              });
              return (data);
            }
        }];
        return (
          this.props.dataSour && <Table rowKey={(record,key) => record.userId} dataSource={this.props.dataSour} columns={columns} pagination={false} />
          
        );
  }
};
export default Tableuser;


