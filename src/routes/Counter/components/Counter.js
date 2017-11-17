import React from 'react';
import { ReactInterval } from 'react-interval';
import moment from 'moment';
import { Table,Input,Button,Select } from 'antd';
import Search from './Search';
import Topone from '../../../components/common/TopOne';
import Timebar from '../../../components/common/Time';
import Modaldia from './Modal';

import {hashHistory} from 'react-router';
import {createHashHistory} from 'history';
var routerHistory =  require('react-router').useRouterHistory;  
const appHistory = routerHistory(createHashHistory)({queryKey:false});  

const { Column, ColumnGroup } = Table;
const Option = Select.Option;
class Counter extends React.Component {
    state = {
        filteredInfo: null,
        sortedInfo: null,
        data:this.props.data,
        flowData:this.props.flowData,
        dataSource:this.props.data2,
        pagination: {},
        loading: false,
        isVisible:false,
        key:Math.random(),
        titleName:'独立IP',
        timeout:60000,
		timeName:'1分钟',
        newTime:moment().format('YYYY-MM-DD HH:mm'),
        name:'indClient'
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
    }
    /*组件接收到新的props时调用*/
    componentWillReceiveProps(nextProps){ 
        if (this.props.data !== nextProps.data) {
            this.setState({data:nextProps.data});
        } 
        if (this.props.flowData !== nextProps.flowData) {
            this.setState({flowData:nextProps.flowData});
        }    
    }
    handleMenuClick =(e)=>{
        this.setState({timeName: e.domEvent.currentTarget.innerHTML});
        this.setState({timeout:parseInt(e.key)});
    }
    tick() {
        this.setState({newTime:moment().format('YYYY-MM-DD HH:mm')});
    }
    handleChange=(pagination, filters, sorter={}) =>{
        let _this = this,pageParams={},filtersField={},sortParams={};
        if(pagination){
            pageParams = { curPage: pagination.current, pageSize: pagination.pageSize };
        }else{
            pageParams = { curPage: 1, pageSize: 20 };
        }
        if(_this.filter === undefined || _this.filter === ''){
          filtersField={dmcTag:'',ip:'',streamName:''};
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
    modalCancel=(e)=>{
        this.setState({isVisible:false});
    }
    showModal=(tagKey,direction)=>{
        let newKey = parseInt(10 * Math.random());
        this.setState({ key: newKey });
        this.setState({isVisible:true});
        this.params = {ip:tagKey,upOrDown:direction}
        this.flowChange();
    }
    flowChange = ()=>{
        let _this = this,filtersField={};
        if(_this.params === undefined || _this.params === ''){
            filtersField={ip:'',upOrDown:''};
          }else{
            Object.assign(filtersField, _this.params);
          }
        const areaParams = Object.assign({},filtersField);
        this.props.getFlowData(areaParams); 
    }
    jumpLink=(link,dmc)=>{
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
        const { data,pageCur,pageDatas,pages ,flowData} = this.props;
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const pagination = {
          total: pageDatas,
          current:pageCur,
         // showSizeChanger: true,
         pageSize:20
        };
        /*table列*/
        const columns = [{
            title: '独立IP',
            dataIndex: 'ip',
            key: 'ip',
            width: 200,
            render:(text)=><span title={text} className="ellips width200">{text}</span>,
            sorter:true,
            sortOrder: sortedInfo.columnKey === 'ip' && sortedInfo.order,
            filteredValue: filteredInfo.ip || '',
        },
        {
            title: '区域',
            dataIndex: 'areaName',
            key: 'areaName',
            width: 150,
            render:(text)=><span title={text} className="ellips width150">{text}</span>,
            sorter:true,
            sortOrder: sortedInfo.columnKey === 'areaName' && sortedInfo.order,
        },{
            title: 'DMC',
            dataIndex: 'dmcSet',
            key: 'dmcSet',
            width: 250,
            render: (text,record) => {
                return(
                    record.dmcSet && record.dmcSet.map(function(item,index){
                    return <a href="javascript:;" title={item.dmcName} className="ellips width250" onClick={()=>self.jumpLink('dmc',item.dmcName)}>
                              {item.dmcName}
                            </a>
                  })
            )},
            filteredValue: filteredInfo.dmcTag || '',
        },{
            title: 'DMS',
            dataIndex: 'dmsSet',
            key: 'dmsSet',
            width: 150,
            render: (text,record) => {
                return(
                    record.dmsSet &&  record.dmsSet.map(function(item,index){
                    return <a href="javascript:;" title={item.dmsName} className="ellips width150" onClick={()=>self.jumpDms('dms',item.dmsName)}>
                              {item.dmsName}
                            </a>
                  })
            )},
        },{
            title: '活跃流',
            dataIndex: 'activeStreamNameSet',
            key: 'activeStreamNameSet',
            render: (text,record) => {
                return(
                     record.activeStreamNameSet &&  record.activeStreamNameSet.map(function(value,index){
                        return <a href="javascript:;" onClick={()=>self.jumpFlow('flow',value)}>
                                    {value}
                                </a>
                    }) 
            )},
            sorter:true,
            sortOrder: sortedInfo.columnKey === 'activeStreamNameSet' && sortedInfo.order,
        },{
            title: '上行',
              children: [{
                title: '活跃流数量',
                dataIndex: 'publishActiveNum',
                key: 'publishActiveNum',
                render:(text,record)=>(text > 0)?<span className="c-modle" onClick={()=>this.showModal(record.ip,'up')}>{text}</span>:text,
                sorter:true,
                sortOrder: sortedInfo.columnKey === 'publishActiveNum' && sortedInfo.order,
            },{
              title: '流量',
              width:90,
              dataIndex: 'publishBps',
                key: 'publishBps',
                width: 90,
                render:(text)=><span title={text} className="ellips width90">{text}</span>,
              sorter:true,
              sortOrder: sortedInfo.columnKey === 'publishBps' && sortedInfo.order,
            }], 
        },{
            title: '下行',
            children: [{
              title: '活跃流数量',
              dataIndex: 'subscriptionActionNum',
            key: 'subscriptionActionNum',
              render:(text,record)=>(text > 0)?<span className="c-modle" onClick={()=>this.showModal(record.ip,'down')}>{text}</span>:text,
              sorter:true,
              sortOrder: sortedInfo.columnKey === 'subscriptionActionNum' && sortedInfo.order,
        }, {
            title: '客户端',
            dataIndex: 'subscriptionNum',
            key: 'subscriptionNum',
            width: 90,
            render: (text,record) => (text > 0)?<a href="javascript:;" title={text} className="ellips width90" onClick={()=>this.jumpIp('zen',record.ip)}>{text}</a>:text,
            sorter:true,
            sortOrder: sortedInfo.columnKey === 'subscriptionNum' && sortedInfo.order,
        },{
            title: '流量',
            width:90,
            dataIndex: 'subscriptionBps',
            key: 'subscriptionBps',
            render:(text)=><span title={text} className="ellips width90">{text}</span>,
            sorter:true,
            sortOrder: sortedInfo.columnKey === 'subscriptionBps' && sortedInfo.order,
        },{
            title: '丢包率',
            width:64,
            dataIndex: 'subscriptionDropRate',
            key: 'subscriptionDropRate',
            render:(text)=><span title={text} className="ellips width60">{text}</span>,
            sorter:true,
            sortOrder: sortedInfo.columnKey === 'subscriptionDropRate' && sortedInfo.order,
        }], 
    }];
{/*数据渲染*/}
    return (
            <div id="indClient">
                <Topone title={this.state.titleName} name={this.state.name}/>
                <Search valSearch={this.valSearch.bind(this)} dmcName={(this.props.location.query.dmcName) ? this.props.location.query.dmcName :''} dmcTag={(this.props.location.query.dmcTag) ? this.props.location.query.dmcTag :''} dmsTag={(this.props.location.query.dmsTag) ? this.props.location.query.dmsTag :''} ip={(this.props.location.query.ip) ? this.props.location.query.ip :''}  streamName={(this.props.location.query.streamName) ? this.props.location.query.streamName :''} />
                <ReactInterval timeout={this.state.timeout} enabled={true} callback={()=>{this.handleChange();this.tick();}} />
                <Timebar itemNum={(pageDatas) ? pageDatas : 0} ref="getTime" handleMenuClick={this.handleMenuClick} timeName={this.state.timeName} newTime={this.state.newTime}/>
                <Table rowKey={(record,key) => key} columns={columns} dataSource={this.state.data} onChange={this.handleChange} pagination={pagination} />
                <Modaldia newKey={this.state.key} visible={this.state.isVisible} modalSource={this.state.flowData} del = {()=>this.modalCancel()} />
            </div>
        );
    }
};
export default Counter;

