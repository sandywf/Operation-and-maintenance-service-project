import React from 'react';
import { Table, Icon, Popconfirm } from 'antd';   // 表格
import UpFlow from './UpFlow';// 全局上行流量折线图
import DownFlow from './DownFlow';// 全局下行流量折线图
import Unusual from './Unusual';// DMS异常状态table
import OverAll from './OverAll';// 全局状况
import Topone from '../../../components/common/TopOne';

class HomeView extends React.Component {
	state = {
		titleName :'全局', 
		name:'home'
	}
	constructor(props) {
        super(props);
  	}
	componentDidMount(){
		this.props.getOverall();
		this.props.getUnusual();
		this.props.getFlow();
		this.props.getDownFlow();
	}
	/*组件接收到新的props时调用*/
	componentWillReceiveProps(nextProps){ 
	  if (this.props.data !== nextProps.data) {
			this.setState({data:nextProps.data});
	  } 
	  if (this.props.unsual !== nextProps.unsual) {
			this.setState({unsual:nextProps.unsual});
	  }
	  if (this.props.flow !== nextProps.flow) {
			this.setState({flow:nextProps.flow});
		}     
		if (this.props.downFlowData !== nextProps.downFlowData) {
			this.setState({downFlowData:nextProps.downFlowData});
		}          
	}
	handleChange = (pagination) => {
		let pageParams = {};
		if(pagination){
				pageParams = { curPage: pagination.current, pageSize: pagination.pageSize };
		}else{
				pageParams = { curPage: 1, pageSize: 10 };
		}
	 	this.props.getUnusual(pageParams);    
	}
	render(){
		const { data,unsual,unsualCur,unsualDatas,flow ,downFlowData} = this.props;
			return(
				<div id="home">
					<Topone title={this.state.titleName} name={this.state.name} />
					{/* 全局状况 */}
					<OverAll allData = {this.state.data} getOverall = {this.props.getOverall} />
					<div className="ms-data">
						{/* DMS异常状态table */}
						<Unusual unsualData = {this.state.unsual} handleChange = {this.handleChange} unsualCur={this.state.unsualCur} unsualDatas={this.state.unsualDatas} getUnusual = {this.props.getUnusual} />
						<div className="ms-flowInfor fr linear">
							<p className="ms-status">
								<i className="iconfont icon-Traffic-information"></i>
								<span>流量信息</span>
							</p>
							<div className="ms-echarts">
								{/* 全局上行流量折线图 */}
								<UpFlow flowData = {this.state.flow} getFlow={this.props.getFlow}/>
							</div>
							<div className="ms-echarts" id="main">
								{/* 全局下行流量折线图 */}
								<DownFlow flowData = {this.state.downFlowData} getDownFlow={this.props.getDownFlow} />
							</div>
						</div>
					</div>    
				</div>
			);
	}
}
export default HomeView;