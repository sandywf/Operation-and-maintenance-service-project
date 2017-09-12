import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Col,Modal,Checkbox,Button, Row} from 'antd';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 14}
};
const options = [
  { label: '用户列表', value: '1' },
  { label: '流媒体服务', value: '2'}
];
class Umodal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pwd: '',userDiv :''}
  }
  handleOk = (e,userId) => {
      e.preventDefault();
      this.props.form.validateFields((errors) => {
          if (errors) {return false;}
          let current = (this.props.form.getFieldsValue());
           const data = this.props.data;
          if (this.props.current.modalType == "add") {
               this.props.doAdd({current,data});
          } else if (this.props.current.modalType == "modify") {
              this.props.doModify({current,data,userId});
          }
          this.props.show();
         // this.setState({pwd:'666666'});
      });
  }
  randomPwd = () =>{
    let pwdNum = '';
    for (let i=0;i<6;i++) pwdNum+=Math.floor(Math.random()*10);
    this.setState({pwd:pwdNum});
  }
 render(){
    const { getFieldDecorator } = this.props.form;
  return (
    this.props.setVisible && <Modal className="user-md" visible={this.props.setVisible} title={this.props.title} data= {this.props.data} current= {this.props.current} onOk={(e)=>this.handleOk(e,this.props.userId)}  onCancel={this.props.del}>
      <Form layout="horizontal"  id="user-modal" onSubmit={this.handleOk}>
        <FormItem label='用户名：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('username',{
            initialValue:this.props.current.username || "",
            rules: [
              {
                required: true,
                message: '请输入用户名'
              },
              {
                 pattern: /^.{6,18}$/,
                 message: '很抱歉，用户名长度需要是6-18个字符'
              },
              {
                pattern: /^[,\.;~!@#\$%\^&\*\(\)\+-=\\\/<>\w]+$/,
                message: '用户名格式不正确'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='密码：' hasFeedback {...formItemLayout}>
          <Row gutter={8}>
            <Col span={12}>
             {getFieldDecorator('password', {
                initialValue:this.state.pwd || "666666",
                rules: [
                  {
                    required: true,
                    message: '请输入密码'
                  },
                  {
                    pattern: /^.{6,18}$/,
                    message: '很抱歉，密码长度需要是6-18个字符'
                  },
                  {
                    pattern: /^[,\.;~!@#\$%\^&\*\(\)\+-=\\\/<>\w]+$/,
                    message: '密码格式不正确'
                  }
                ],
             })(<Input size="large" />)}
             </Col>
            <Col span={12}>
              <Button size="large" onClick={this.randomPwd}>随机密码</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem label='姓名：' hasFeedback {...formItemLayout}>
         {getFieldDecorator('realname', {
            initialValue:this.props.current.realname || "",
            rules: [
              {
                required: true,
                message: '请输入姓名'
              },
            ],
          })(<Input max={10}/>)}
        </FormItem>
        <FormItem label='邮箱：' hasFeedback {...formItemLayout}>
         {getFieldDecorator('email', {
            initialValue:this.props.current.email || "",
            rules: [{
              type: 'email', message: '邮件格式不正确!',
            }, {
              required: true, message: '请输入邮箱地址!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label='手机：' hasFeedback {...formItemLayout}>
           {getFieldDecorator('tel', {
            initialValue:this.props.current.tel || "",
            rules: [
              {
                required: true,
                message: '手机不能为空'
              },
              {
                pattern: /^1[34578]\d{9}$/,
                message: '手机格式不正确'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='功能：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('functions', {
           initialValue:this.props.current.functions || [],
            rules: [
              {
                required: true,
                message: '不能为空',
                type: 'array'
              }
            ]
          })(<CheckboxGroup options={options} />)}
        </FormItem>
      </Form>
    </Modal>
    );
  }
};
export default Form.create()(Umodal);