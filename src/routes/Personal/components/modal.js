import React from 'react'
import {Form,Input,Col,Modal,Button} from 'antd';
const FormItem = Form.Item;
class Pmodal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalVisible:false}
  }
  handleOk(e,userId){
    e.preventDefault();
    this.props.form.validateFields((errors) => {
      if (errors) {return false;}
      let current = (this.props.form.getFieldsValue());
      const data = this.props.data;
      this.props.updatePwd({current,data,userId});
      this.props.show();
    });
  }  
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('两次密码不一致!');
    } else {
      callback();
    }
  }
 
  render() {
    const { getFieldDecorator } = this.props.form;
  return (
   <Modal key={this.props.key} className="ms-modal" title="设置密码" data= {this.props.data} visible={this.props.modalVisible} onOk={(e)=>this.handleOk(e,this.props.userId)} onCancel={this.props.handleCancel}
    footer={<Button className="ms-perbtn" onClick={(e)=>this.handleOk(e,this.props.userId)}>确认</Button>}>
              <Form>
              <ul className="ms-password">
                <li>
                  <FormItem>
                    <label>原密码：<span>(请先验证原密码)</span></label>
                    {getFieldDecorator('password',{
                      rules: [{
                      required: true, message: '请输入原密码',
                    }],})(
                    <Input type="password"  />
                 )}
                  </FormItem>
                </li>
                <li>
                  <FormItem>
                  <label>新密码：<span>(最小长度6个字符)</span></label>
                  {getFieldDecorator('newPassword', {
                    rules: [{
                      required: true, message: '请输入新密码',
                    }, {
                          pattern: /^.{6,18}$/,
                          message: '很抱歉，密码长度需要是6-18个字符'
                        },
                        {
                          pattern: /^[,\.;~!@#\$%\^&\*\(\)\+-=\\\/<>\w]+$/,
                          message: '密码格式不正确'
                        }],
                  })(
                    <Input type="password" />
                 )}
               </FormItem>
                </li>
                <li>
                  <FormItem>
                  <label>确认密码：<span>(最小长度6个字符)</span></label>
                  {getFieldDecorator('confirm', {
                    rules: [{
                      required: true, message: '请输入确认密码',
                    }, {
                      validator: this.checkPassword,
                    }],
                  })(
                    <Input type="password" />
                 )}
               </FormItem>
                </li>
              </ul>
              </Form>
      </Modal>
     );
  }
}
export default Form.create()(Pmodal)
