import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Col,Modal,Checkbox,Button, Row} from 'antd';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 14}
};

const Umodal = React.createClass({
   handleOk(e) {
      e.preventDefault();
      this.props.form.validateFields((errors) => {
          if (errors) {return false;}
          let current = (this.props.form.getFieldsValue());
           const data = this.props.data;
          if (this.props.current.modalType == "add") {
               this.props.doAdd({current, data});
          } else if (this.props.current.modalType == "modify") {
              current.key = this.props.current.key;
              this.props.doModify({current, data});
              this.setState({isVisible:false});
          }
          this.setState({isVisible:false});
      });
  },

 render(){
    const options = [
      { label: '流媒体服务', value: 'server' },
      { label: '用户列表', value: 'user' }
    ];
    const { getFieldDecorator } = this.props.form;
  return (
    <Modal className="user-md"  title={this.props.title} data= {this.props.data} current= {this.props.current} visible={this.props.visible} onOk={this.handleOk}  onCancel={this.props.del}>
      <Form layout="horizontal"  id="user-modal">
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
                initialValue:this.props.current.password || "",
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
              <Button size="large" onClick={this.random}>随机密码</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem label='姓名：' hasFeedback {...formItemLayout}>
         {getFieldDecorator('name', {
            initialValue:this.props.current.name || "",
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
           {getFieldDecorator('phonenum', {
            initialValue:this.props.current.phonenum || "",
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
          {getFieldDecorator('func', {
           initialValue:this.props.current.func || "",
            rules: [
              {
                required: true,
                message: '不能为空'
              }
            ]
          })(<CheckboxGroup options={options} />)}
        </FormItem>
      </Form>
    </Modal>
    );
  }
});
Umodal.propTypes = {
  data: PropTypes.array.isRequired,
}
export default Form.create()(Umodal);