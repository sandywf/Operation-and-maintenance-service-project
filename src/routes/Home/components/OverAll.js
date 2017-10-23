import React from 'react';
import { ReactInterval } from 'react-interval';
import moment from 'moment';
import Timebar from '../../../components/common/Time';
import {Select,Menu, Dropdown} from 'antd';
const Option = Select.Option;

class OverAll extends React.Component {
	state = {
		timeout:60000,
		timeName:'1分钟',
		newTime:moment().format('YYYY-MM-DD HH:mm'),
		all:'all'
	}
	handleMenuClick =(e)=>{
		this.setState({timeName: e.domEvent.currentTarget.innerHTML});
		this.setState({timeout:parseInt(e.key)});
	}
	tick() {
			this.setState({newTime:moment().format('YYYY-MM-DD HH:mm')});
	}
 	render() { 
		 let data = (this.props.allData) ? this.props.allData : {dmcLiveCount:'',
		 dmcTotal:'',
		 dmsLiveCount:'',
		 dmsTotal:'',
		 downStreamBps:'',
		 streamLiveCount:'',
		 streamSyncCount:'',
		 subscriptionTotal:'',
		 syncStreamBps:'',
		 upStreamBps:''};
  		return (
			<div className="ms-overall-status linear">
				<ReactInterval timeout={this.state.timeout} enabled={true} callback={()=>{this.props.getOverall();this.tick();}} />
      			<Timebar ref="getTime" all ={this.state.all} handleMenuClick={this.handleMenuClick} timeName={this.state.timeName} newTime={this.state.newTime}/>
				<ul className="ms-view">
				<li>
					<div className="ms-view-num">
						<p className="ms-viewp">
							<span>{data.dmcLiveCount} </span>
							<span>活跃</span>
						</p>
						<hr />
						<p className="ms-active ms-active-bg">{data.dmcTotal}</p>
					</div>
					<p className="ms-view-name">DMC服务器</p>
				</li>
				<li>
					<div className="ms-view-num">
						<p className="ms-viewp">
							<span>{data.dmsLiveCount} </span>
							<span>活跃</span>
						</p>
						<hr />
						<p className="ms-active">{data.dmsTotal}</p>
					</div>
					<p className="ms-view-name">DMS服务器</p>
				</li>
				<li>
					<div className="ms-view-num">
						<p className="ms-viewp">
							<span>{data.streamSyncCount} </span>
							<span>同步</span>
						</p>
						<hr />
						<p className="ms-active ms-active-bg">{data.streamLiveCount}</p>
					</div>
					<p className="ms-view-name">活跃流</p>
				</li>
				<li>
					<div className="ms-view-num">
						<p className="w100">{data.subscriptionTotal}</p>
					</div>
					<p className="ms-view-name">订阅客户端</p>
				</li>
				<li className="ms-nobg">
					<div className="ms-view-num">
						<p className="w100">{data.upStreamBps}</p>
					</div>
					<p className="ms-view-name">全局上行流量</p>
				</li>
				<li className="ms-nobg">
					<div className="ms-view-num">
						<p className="w100">{data.downStreamBps}</p>
					</div>
					<p className="ms-view-name">全局下行流量</p>
				</li>
				<li className="ms-nobg">
					<div className="ms-view-num">
						<p className="w100">{data.syncStreamBps}</p>
						{/* {data.syncStreamBps===0 ? <span><em>G</em><span>bp/s</span></span> : ''} */}
					</div>
					<p className="ms-view-name">全局同步流量</p>
				</li>
			</ul>
    	</div>
       );
    }
};
export default OverAll;