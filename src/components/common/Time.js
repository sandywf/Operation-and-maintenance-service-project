import React from 'react';
import { Dropdown,Menu } from 'antd';
class Timebar extends React.Component {
    state = {
        time:2000,
        timeName:'2秒',
    }
    handleMenuClick =(e)=>{
      this.setState({ time: parseInt(e.key) });
      this.setState({timeName: e.domEvent.currentTarget.innerHTML});
    }
    render() {
        const menu = (
                <Menu onClick={this.handleMenuClick}>
                  <Menu.Item key={10000}>10秒</Menu.Item>
                  <Menu.Item key={30000}>30秒</Menu.Item>
                  <Menu.Item key={60000}>1分钟</Menu.Item>
                </Menu>
        );
        return(
            <div className="t-num">总共<span className="c-blue">{this.props.itemNum}</span>条数据
                <div className="menuRight fr">已更新：16:54:59
                    <Dropdown overlay={menu}>
                        <i className="iconfont icon-Refresh ant-dropdown-link"></i>
                    </Dropdown>{this.state.timeName}
                </div>
            </div>  
        )
    }
};
export default Timebar;