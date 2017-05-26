import React from 'react';
import {Select,Menu, Dropdown} from 'antd';
const Option = Select.Option;
const OverAll = React.createClass({
	getInitialState: function() {
      return {
        time:20000,
        timeName:'2秒'
      };
    },
    handleMenuClick (e){
    	this.setState({ time: parseInt(e.key) });
    	this.setState({timeName: e.domEvent.currentTarget.innerHTML});
  	},
 	render: function() { 
 		const menu = (
    	  <Menu onClick={this.handleMenuClick}>
    	    <Menu.Item key={10000}>10秒</Menu.Item>
    	    <Menu.Item key={30000}>30秒</Menu.Item>
    	    <Menu.Item key={60000}>1分钟</Menu.Item>
    	  </Menu>
    	);
  		return (
			<div className="ms-overall-status linear">
				<p className="ms-status">
					<i className="iconfont icon-Global-status"></i>
					<span>全局状况</span>
					<span className="fr">
						<em>刷新时间：</em>
						<time>2017-00-00 00:00</time>
						<strong>{this.state.timeName}</strong>
						 <Dropdown overlay={menu}>
							<i className="iconfont icon-Refresh"></i>
    		        	</Dropdown>
					</span>
				</p>
			<ul className="ms-view">
				<li>
					<div className="ms-view-num">
						<p className="ms-viewp">
							<span>226 </span>
							<span>活跃</span>
						</p>
						<hr />
						<p className="ms-active ms-active-bg">253</p>
					</div>
					<p className="ms-view-name">DMC服务器</p>
				</li>
				<li>
					<div className="ms-view-num">
						<p className="ms-viewp">
							<span>226 </span>
							<span>活跃</span>
						</p>
						<hr />
						<p className="ms-active">253</p>
					</div>
					<p className="ms-view-name">DMS服务器</p>
				</li>
				<li>
					<div className="ms-view-num">
						<p className="ms-viewp">
							<span>226 </span>
							<span>同步</span>
						</p>
						<hr />
						<p className="ms-active ms-active-bg">253</p>
					</div>
					<p className="ms-view-name">活跃流</p>
				</li>
				<li>
					<div className="ms-view-num">
						<p className="w100">599</p>
					</div>
					<p className="ms-view-name">订阅客户端</p>
				</li>
				<li className="ms-nobg">
					<div className="ms-view-num">
						<p className="w100">37<em>G</em><span>bp/s</span></p>
					</div>
					<p className="ms-view-name">全局上行流量</p>
				</li>
				<li className="ms-nobg">
					<div className="ms-view-num">
						<p className="w100">370<em>G</em><span>bp/s</span></p>
					</div>
					<p className="ms-view-name">全局下行流量</p>
				</li>
				<li className="ms-nobg">
					<div className="ms-view-num">
						<p className="w100">38<em>G</em><span>bp/s</span></p>
					</div>
					<p className="ms-view-name">全局同步流量</p>
				</li>
			</ul>
    	</div>
       );
    }
});
export default OverAll;