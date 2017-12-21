import React from 'react';
import {withRouter,browserHistory} from 'react-router';
import { Form, Icon, Input, Button, Checkbox ,Modal} from 'antd';
import Logo from '../../../public/_module/images/login-logo.png'
const FormItem = Form.Item;
//样式文件
import classes from './msLogin.scss';

const Login = withRouter(
    React.createClass({
      getInitialState(event) {
        return {
          error: false
        }
      },
      componentDidMount(){
        var body_element = document.getElementsByTagName("body")[0];
        body_element.style.backgroundColor= "#193760";
      },
      handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            let username = values.username;
            let password = values.password;
            this.props.login({username,password});
          }
        });
      },
      render: function() {
        const { getFieldDecorator } = this.props.form;
        return (
          <form onSubmit={this.handleSubmit}>
            <div className={classes['zweb']}>
              <div className={classes["container"]}>
                <div className={classes["ms-logo"]}>
                  <div className={classes["ms-circle"]}> <img alt='LOGO' src={Logo} /></div>
                </div>     
                <div className={classes["ms-login"]}>
                  <FormItem>
                    {getFieldDecorator('username', {
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
                      ],
                    })(<label className={this.state.active === 'user' ?"focus":""}>
                        <i className="iconfont icon-operation-login-name"></i>
                        <input ref="user" placeholder="请输入用户名" onFocus={() => this.setState({active:'user'})}/>
                      </label>
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('password', {
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
                    })(<label className={this.state.active === 'pass' ?"focus":""}>
                          <i className="iconfont icon-operation-password"></i>
                          <input ref="pass" type="password" onFocus={() => this.setState({active:'pass'})} placeholder="请输入密码" />
                        </label>)}
                  </FormItem>
                  <button type="submit"> 登录 </button>
                </div>

                      <ul className={classes["ms-nav"]}>
                        <li>
                          <i className="iconfont icon-respond-timely"></i>
                          <h3>响应更及时</h3>
                          <p>轻松应对故障，实时响应解决。</p>
                        </li>

                        <li>
                          <i className="iconfont icon-operation-efficiency"></i>
                          <h3>运维更高效</h3>
                          <p>更直观便捷的展现方式，提前预警提前解决。</p>
                        </li>

                        <li>
                          <i className="iconfont icon-service-protection"></i>
                          <h3>服务更保障</h3>
                          <p>智能优化音视频传输路径，可扩充式的服务器部署。</p>
                        </li>

                        <li>
                          <i className="iconfont icon-information-transparency"></i>
                          <h3>信息更透明</h3>
                          <p>随时随地掌握最实时，最真实的信息。</p>
                        </li>
                      </ul>
                    <footer className={classes["ms-footer"]}>Copyright @2016 阔地教育科技有限公司. 版权所有 </footer>
                  </div>
                </div>
                {this.state.error && (<p>Bad login information</p>)}
              </form>
            );
        }

    })
)
const mslogin = Form.create()(Login);
export default mslogin
