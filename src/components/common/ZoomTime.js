import React from 'react';
import { Dropdown,Menu } from 'antd';

class ZoomTime extends React.Component {

    render() {
        const menu = (
                <Menu onClick={this.props.handleMenuClick}>
                  <Menu.Item key={1}>5分钟</Menu.Item>
                  <Menu.Item key={2}>1小时</Menu.Item>
                  <Menu.Item key={3}>1天</Menu.Item>
                </Menu>
        );
        return(
            <div className="fresh">
                <Dropdown overlay={menu}>
                   <div className="freshTime"> <i className="iconfont icon-allocation"></i>设置</div>
                </Dropdown>
            </div>
        )
    }
};
export default ZoomTime;