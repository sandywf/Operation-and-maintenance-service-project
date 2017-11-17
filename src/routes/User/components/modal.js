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
    this.state = {pwd:this.props.password,editPwd:true}
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
      });
  }
  randomPwd = () =>{
    var pwdNum = '';
    var arr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9'];
    for(var i = 0 ; i < 6 ; i ++ ){
      pwdNum += ''+arr[Math.floor(Math.random() * arr.length)];
    }
    this.props.pwdEdit(pwdNum);
    this.props.form.setFieldsValue({
      password: pwdNum,
    });
  }
  onChangePwd=(e)=>{
    this.setState({editPwd:false});
    this.props.pwdEdit(e.target.value);
  }
 render(){
    const { getFieldDecorator,setFieldsValue } = this.props.form;
  return (
    this.props.setVisible && <Modal className="user-md" key={this.props.newKey} pwdEdit={this.props.pwdEdit} visible={this.props.setVisible} title={this.props.title} data= {this.props.data} current= {this.props.current} onOk={(e)=>this.handleOk(e,this.props.userId)}  onCancel={this.props.del}>
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
          })(<Input disabled={this.props.current.modalType == 'modify' && 'false'} />)}
        </FormItem>
        <FormItem label='密码：' hasFeedback {...formItemLayout}>
          <Row gutter={8}>
            <Col span={12}>
             {getFieldDecorator('password', {
                // initialValue:this.props.password || '',
                initialValue: this.props.current.modalType == 'modify' ? '' : this.props.password,
                rules:  this.state.editPwd ? [] : [
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
             })(<Input size="large" onChange={this.onChangePwd} />)}
             </Col>
            <Col span={12}>
              <Button size="large" onClick={()=>this.randomPwd()}>随机密码</Button>
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
              {
                pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/,
                message: '只能输入中文、字母、数字'
              },
              {
                pattern: /^\S{1,10}$/,
                message: '最多输入10位'
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