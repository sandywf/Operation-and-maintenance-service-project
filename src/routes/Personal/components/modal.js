import React from 'react'
import {Form,Input,Col,Modal,Button} from 'antd';
const FormItem = Form.Item;

class Pmodal extends React.Component {
  
  static defaultProps = {
    modalVisible:false,
    handleCancel:() => {},
    handleOk:() => {},
  }
   handleOk(e){
    e.preventDefault();
    this.props.form.validateFields((err,values) => {
      if (!err) {
        this.props.handleOk();
      }
    })
  }  
checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码不一致!');
    } else {
      callback();
    }
  }
 
  render() {
    const {modalVisible,handleOk,handleCancel} = this.props;
    const { getFieldDecorator } = this.props.form;
  return (
   <Modal className="ms-modal" title="设置密码" visible={modalVisible} onOk={(e)=>this.handleOk(e)} onCancel={()=>handleCancel()}
    footer={<Button className="ms-perbtn" onClick={(e)=>this.handleOk(e)}>确认</Button>}>
              <Form>
              <ul className="ms-password">
                <li>
                  <FormItem>
                    <label>原密码：<span>(请先验证原密码)</span></label>
                    {getFieldDecorator('oldPassword',{
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
                  {getFieldDecorator('password', {
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
