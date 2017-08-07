import React from 'react';
import { Table, Icon, Popconfirm } from 'antd';   // 表格
import UpFlow from './UpFlow';// 全局上行流量折线图
import DownFlow from './DownFlow';// 全局下行流量折线图
import Unusual from './Unusual';// DMS异常状态table
import OverAll from './OverAll';// 全局状况
import Topone from '../../../components/common/TopOne';
import classes from './HomeView.css';
import FormatUtils from '../../../public/_module/js/common.js';

class HomeView extends React.Component {
	 state = {
        titleName:'全局',
    };
	fullScreen(){
		var elem = document.getElementById("home");   
		FormatUtils.requestFullScreen(elem);
	}
	render(){
		return(
			<div id="home">
				<Topone title={this.state.titleName} />
				{/* 全局状况 */}
				<OverAll />
				<div className="ms-data">
					{/* DMS异常状态table */}
					<Unusual />
					<div className="ms-flowInfor fr linear">
						<p className="ms-status">
							<i className="iconfont icon-Traffic-information"></i>
							<span>流量信息</span>
						</p>
						<div className="ms-echarts">
							{/* 全局上行流量折线图 */}
							<UpFlow />
						</div>
						<div className="ms-echarts" id="main">
							{/* 全局下行流量折线图 */}
							<DownFlow />
						</div>
					</div>
				</div>    
			</div>
		);
	}
};
export default HomeView;