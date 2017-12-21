import React from 'react';
import moment from 'moment';
import Timebar from '../../../components/common/Time';
import { Table, Icon, Popconfirm,Select,Menu, Dropdown } from 'antd';
const { Column, ColumnGrounp } = Table;
import {hashHistory} from 'react-router';
import {createHashHistory} from 'history';
var routerHistory =  require('react-router').useRouterHistory;  
const appHistory = routerHistory(createHashHistory)({queryKey:false});  

class Unusual extends React.Component {
	state = {
		timeName:'1分钟',
		timeout:60000,
		newTime:moment().format('YYYY-MM-DD HH:mm'),
		all:'unusual'
	}
	/*真实的DOM被渲染出来后调用*/
	componentDidMount(){
        this.timerFun(60000);
	}
	 // 销毁定时器
	 componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
    }
    // 定时器的时间选择
    handleMenuClick =(e)=>{
        if(parseInt(e.key)=='0'){
            this.setTime();
            this.timerFun(60000);
        }else{
            this.setState({timeout:parseInt(e.key)});
            this.setState({timeName: e.domEvent.currentTarget.innerHTML});
            this.timerFun(parseInt(e.key));
        }
    }
    // 定时器方法
    timerFun=(time)=>{
        this.timer && clearTimeout(this.timer);
        this.timer = setInterval(() => {
            this.setTime();
        }, time)
    }
    // 定时器回调
    setTime=()=>{
		this.props.getUnusual();
		this.tick();
    }
	tick() {
		this.setState({newTime:moment().format('YYYY-MM-DD HH:mm')});
	}
	jumpDmc=(link,dmc)=>{
		appHistory.push({
				pathname: link,
				query: {
						dmcName:dmc
				},
		})
	}
	jumpDms=(link,dmsname)=>{
		appHistory.push({
				pathname: link,
				query: {
						dmsName:dmsname
				},
		})
	}
 	render() { 
		const pagination = {
			total: this.props.unsualDatas,
			current:this.props.unsualCur,
			//showSizeChanger: true,
		};
		const columns = [{
			title: 'DMS名称',
			dataIndex: 'dmsServerName',
			key: 'dmsServerName',
			width: 350,
			render:(text,record)=><a href="javascript:;" title={text} className="ellips width350" onClick={()=>this.jumpDms('dms',record.dmsServerName)} >{text}</a>,
		  }, {
			title: 'DMC名称',
			dataIndex: 'dmcServerName',
			key: 'dmcServerName',
			width: 350,
			render:(text,record)=><a href="javascript:;" title={text} className="ellips width350" onClick={()=>this.jumpDmc('dmc',record.dmcServerName)} >{text}</a>,
		  }, {
			title: '错误数量',
			dataIndex: 'errorNum',
			key: 'errorNum',
		  }];
  	return (
  		<div className="ms-abnormal fl linear">
     	 	<Timebar ref="getTime" all ={this.state.all} handleMenuClick={this.handleMenuClick} timeName={this.state.timeName} newTime={this.state.newTime}/>
			<Table className="ms-data-table" rowkey={(record,key)=>key} dataSource={this.props.unsualData} columns={columns} onChange={this.props.handleChange} pagination={pagination} />
		</div>
       );
    }
};
export default Unusual;
