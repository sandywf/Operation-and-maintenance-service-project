import React from 'react';
import moment from 'moment';
import { Table,Input,Button,Select } from 'antd';
import Search from './Search';
import Topone from '../../../components/common/TopOne';
import Timebar from '../../../components/common/Time';

import {hashHistory} from 'react-router';
import {createHashHistory} from 'history';
var routerHistory =  require('react-router').useRouterHistory;  
const appHistory = routerHistory(createHashHistory)({queryKey:false});  

const { Column, ColumnGroup } = Table;
const Option = Select.Option;

class Counter extends React.Component {
    state={
      filterDropdownVisible: false,
      filteredInfo: null,
      sortedInfo: null,
      titleName:'订阅客户端',
      timeName:'1分钟',
      timeout:60000,
      newTime:moment().format('YYYY-MM-DD HH:mm'),
      name:'zen'
    };
    constructor(props) {
        super(props);
        this.filter = '';
        this.timeoutId = '';
    }
    /*真实的DOM被渲染出来后调用*/
    componentDidMount(){
        if(!this.props.location.search){
            this.props.getKHData();
        }
        this.timerFun(60000);
    }
    /*组件接收到新的props时调用*/
    componentWillReceiveProps(nextProps){ 
        if (this.props.data !== nextProps.data) {
            this.setState({data:nextProps.data});
          }    
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
        this.handleChange();
        this.tick();
    }
    tick() {
        this.setState({newTime:moment().format('YYYY-MM-DD HH:mm')});
    }
    handleChange=(pagination, filters, sorter={}) =>{
        let _this = this,pageParams={},filtersField={},sortParams={};
        if(pagination){
            pageParams = { curPage: pagination.current, pageSize: pagination.pageSize };
        }else{
            pageParams = { curPage: 1, pageSize: 10 };
        }
        if(_this.filter === undefined || _this.filter === ''){
          filtersField={dmcTag:'',dmsTag:'',ip:'',streamName:''};
        }else{
          Object.assign(filtersField, _this.filter);
        }
        if (Object.keys(sorter).length !== 0) {
            const sortMethod = sorter.order === "descend" ? "desc" : "asc";
            sortParams['sortsKey'] = `${sorter.columnKey}`;
            sortParams['sortsType'] = `${sortMethod}`;
        }  else{
            sortParams['sortsKey'] = '';
            sortParams['sortsType'] = '';
        }
       const params = Object.assign({}, pageParams,filtersField, sortParams);
       this.props.getKHData(params);    
    }
    valSearch =(searchContent) =>{
      this.filter = searchContent;
      this.handleChange();
    }
    jumpLink=(link,dmc)=>{
        appHistory.push({
            pathname: link,
            query: {
                dmcTag:dmc,
            },
        })
    }
    jumpDmc=(link,dmc)=>{
        appHistory.push({
            pathname: link,
            query: {
                dmcName:dmc,
            },
        })
    }
    jumpDms=(link,dms)=>{
        appHistory.push({
            pathname: link,
            query: {
                dmsName:dms,
            },
        })
    }
     jumpFlow=(link,flow)=>{
        appHistory.push({
            pathname: link,
            query: {
                streamName:flow,
            },
        })
    }
    jumpIp=(link,ip)=>{
        appHistory.push({
            pathname: link,
            query: {
                ip:ip,
            },
        })
    }
    render() {
        let self = this;
        const { data,pageCur,pageDatas,pages } = this.props;
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const pagination = {
          total: pageDatas,
          current:pageCur,
          //showSizeChanger: true,
          pageSize:20
        };
        /*table列*/
        const columns = [{
            title: '客户端',
            dataIndex: 'subscriptionId',
            key: 'subscriptionId',
            width: 150,
            render:(text)=><span title={text}>{text}</span>,
            sorter:true,
            sortOrder: sortedInfo.columnKey === 'subscriptionId' && sortedInfo.order,
        },
        {
            title: 'DMC名称',
            dataIndex: 'dmcName',
            key: 'dmcName',
            width: 150,
            render: (text,record) => <a href="javascript:;" title={text} className="ellips" onClick={()=>this.jumpDmc('dmc',record.dmcName)}>{text}</a>,
            sorter:true,
            sortOrder: sortedInfo.columnKey === 'dmcTag' && sortedInfo.order,
            filteredValue: filteredInfo.dmcTag || '',
        }, {
            title: 'DMS名称',
            dataIndex: 'dmsName',
            key: 'dmsName',
            width: 150,
             render: (text,record) => <a href="javascript:;" title={text} className="ellips" onClick={()=>this.jumpDms('dms',record.dmsName)}>{text}</a>,
            sorter:true,
            sortOrder: sortedInfo.columnKey === 'dmsTag' && sortedInfo.order,
        },{
            title: '流名称',
            width: 200,
            dataIndex: 'streamName',
            key: 'streamName',
            render: (text,record) => <a href="javascript:;" title={text} className="ellips" onClick={()=>this.jumpFlow('flow',record.streamName)}>{text}</a>,
            sorter:true,
            sortOrder: sortedInfo.columnKey === 'streamName' && sortedInfo.order,
            filteredValue: filteredInfo.streamName || '',
        },{
            title: '独立IP',
            dataIndex: 'ip',
            key: 'ip',
            width: 150,
            render: (text,record) => <a href="javascript:;" title={text} className="ellips" onClick={()=>this.jumpIp('independentIp',record.ip)}>{text}</a>,
            sorter:true,
            sortOrder: sortedInfo.columnKey === 'ip' && sortedInfo.order,
            filteredValue: filteredInfo.ip || '',
        },{
            title: '流开始时间',
            width:130,
            dataIndex: 'streamStartTime',
            key: 'streamStartTime',
            render:(text)=><span title={text}>{text}</span>,
            sorter:true,
            sortOrder: sortedInfo.columnKey === 'streamStartTime' && sortedInfo.order,
        },{
            title: '客户端开始时间',
            width:140,
            dataIndex: 'clientStartTime',
            key: 'clientStartTime',
            render:(text)=><span title={text}>{text}</span>,
            sorter:true,
            sortOrder: sortedInfo.columnKey === 'clientStartTime' && sortedInfo.order,
        },{
            title: '流属性',
            children: [{
                title: '分辨率',
                width:80,
                dataIndex: 'resolution',
                key: 'resolution',
                render:(text)=><span title={text}>{text}</span>,
                sorter:true,
                sortOrder: sortedInfo.columnKey === 'resolution' && sortedInfo.order,
            }, {
                title: '帧率',
                width:50,
                dataIndex: 'frameRate',
                key: 'frameRate',
                render:(text)=><span title={text}>{text}</span>,
                sorter:true,
                sortOrder: sortedInfo.columnKey === 'frameRate' && sortedInfo.order,
            }], 
        },{
            title: '下行',
            children: [{
            title: '流量',
            width:90,
            dataIndex: 'subscriptionBps',
            key: 'subscriptionBps',
            render:(text)=><span title={text}>{text}</span>,
            sorter:true,
            sortOrder: sortedInfo.columnKey === 'subscriptionBps' && sortedInfo.order,
        },{
            title: '区域',
            dataIndex: 'areaName',
            key: 'areaName',
            width:90,
            render:(text)=><span title={text}>{text}</span>,
            sorter:true,
            sortOrder: sortedInfo.columnKey === 'areaName' && sortedInfo.order,
        },{
            title: '丢包率',
            width:64,
            dataIndex: 'subscriptionDropRate',
            key: 'subscriptionDropRate',
            render:(text)=><span title={text}>{text}</span>,
            sorter:true,
            sortOrder: sortedInfo.columnKey === 'subscriptionDropRate' && sortedInfo.order,
        }], 
      }];
    return   (
            <div id="zen">
                <Topone title={this.state.titleName} name={this.state.name} />
                <Search valSearch={this.valSearch.bind(this)} dmcTag={(this.props.location.query.dmcTag) ? this.props.location.query.dmcTag :''} dmsTag={(this.props.location.query.dmsTag) ? this.props.location.query.dmsTag :''} ip={(this.props.location.query.ip) ? this.props.location.query.ip :''} streamName={(this.props.location.query.streamName) ? this.props.location.query.streamName :''} />
                <Timebar itemNum={(pageDatas) ? pageDatas : 0} ref="getTime" handleMenuClick={this.handleMenuClick} timeName={this.state.timeName} newTime={this.state.newTime}/>
                <Table rowKey={(record,key) => key} columns={columns} dataSource={this.state.data} onChange={this.handleChange} pagination={pagination} />
            </div>
        );
    }
};
export default Counter;