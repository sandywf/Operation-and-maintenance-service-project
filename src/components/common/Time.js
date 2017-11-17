import React from 'react';
import { Dropdown,Menu } from 'antd';

class Timebar extends React.Component {

    render() {
        const menu = (
                <Menu onClick={this.props.handleMenuClick}>
                  <Menu.Item key={10000}>10秒</Menu.Item>
                  <Menu.Item key={30000}>30秒</Menu.Item>
                  <Menu.Item key={60000}>1分钟</Menu.Item>
                  <Menu.Item key={300000}>5分钟</Menu.Item>
                  <Menu.Item key={600000}>10分钟</Menu.Item>
                  <Menu.Item key={3600000}>1小时</Menu.Item>
                  <Menu.Item key={0}>立即刷新</Menu.Item>
                </Menu>
        );
        return(
            <div className="t-num">
                {this.props.all ? 
                (this.props.all === 'unusual' ? 
                <span className="ms-status"><i className="iconfont icon-DMS-Abnormal-condition"></i><span>DMS异常状态</span></span> 
                : <span className="ms-status"><i className="iconfont icon-Global-status"></i><span>全局状况</span></span>) 
                : <span>总共<span className="c-blue">{(this.props.itemNum) ? this.props.itemNum : 0}</span>条数据</span>}
                <div className="menuRight fr">刷新时间：{this.props.newTime}
                    <span className="time-name">[{this.props.timeName}]</span>
                    <Dropdown overlay={menu}>
                        <i className="iconfont icon-Refresh ant-dropdown-link"></i>
                    </Dropdown>
                </div>
            </div>  
        )
    }
};
export default Timebar;