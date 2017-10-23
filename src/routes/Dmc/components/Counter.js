import React from 'react';
import {hashHistory} from 'react-router';
import {createHashHistory} from 'history';

import { ReactInterval } from 'react-interval';
import moment from 'moment';
import { Table, Input, Button, Select } from 'antd';
import Search from './Search';
import Topone from '../../../components/common/TopOne';
import Timebar from '../../../components/common/Time';
import Modaldia from './Modal';
var routerHistory =  require('react-router').useRouterHistory;  
const appHistory = routerHistory(createHashHistory)({queryKey:false});  

const { Column, ColumnGroup } = Table;
const Option = Select.Option;

class Counter extends React.Component {
    state = {
        filteredInfo: null,
        sortedInfo: null,
        loading: false,
        isVisible: false,
        key: 1,
        titleName: 'DMC',
        timeout:60000,
		timeName:'1分钟',
        newTime:moment().format('YYYY-MM-DD HH:mm'),
        name:'dmc'
    }
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.filter = '';
        this.timeoutId = '';
    }
    handleMenuClick =(e)=>{
        this.setState({timeName: e.domEvent.currentTarget.innerHTML});
        this.setState({timeout:parseInt(e.key)});
    }
    tick() {
        this.setState({newTime:moment().format('YYYY-MM-DD HH:mm')});
    }
    componentDidMount() {
        if(!this.props.location.search){
            this.props.getDMCData();
        }
    }
    componentWillReceiveProps(nextProps){ 
        if (this.props !== nextProps) {
            this.setState({data:nextProps.data});
            this.setState({areaData:nextProps.areaData});
        }
    }
    handleChange = (pagination ,filters,sorter={}) => {
        let _this = this,pageParams={},filtersField={},sortParams={};
        if(pagination){
            pageParams = { curPage: pagination.current, pageSize: pagination.pageSize };
        }else{
            pageParams = { curPage: 1, pageSize: 20 };
        }
        if(_this.filter === undefined || _this.filter === ''){
          filtersField={activeStatus:'',dmcName:''};
        }else{
          Object.assign(filtersField, _this.filter);
        }
        if ( Object.keys(sorter).length !== 0) {
            const sortMethod = sorter.order === "descend" ? "desc" : "asc";
            sortParams['sortsKey'] = `${sorter.columnKey}`;
            sortParams['sortsType'] = `${sortMethod}`;
        }  else{
            sortParams['sortsKey'] = '';
            sortParams['sortsType'] = '';
        }
       const params = Object.assign({}, pageParams,filtersField, sortParams);
       this.props.getDMCData(params);    
    }
    areaChange = (pagination)=>{
        let _this = this,pageParams={},filtersField={};
        if(_this.params === undefined || _this.params === ''){
            filtersField={dmcTag:'',upOrDown:''};
          }else{
            Object.assign(filtersField, _this.params);
          }
        if(pagination){
            pageParams = { curPage: pagination.current, pageSize: pagination.pageSize };
        }else{
            pageParams = { curPage: 1, pageSize: 10 };
        }
        const areaParams = Object.assign({}, pageParams,filtersField);
        this.props.getDMCArea(areaParams); 
    }
    valSearch = (values) => {
        this.filter = values;
        this.handleChange();
    }
    modalCancel = (e) => {
        this.setState({ isVisible: false });
    }
    showModal = (tagKey,direction) => {
        let newKey = parseInt(100 * Math.random());
        this.setState({ key: newKey });
        this.setState({ isVisible: true });
        this.params = {dmcTag:tagKey,upOrDown:direction}
        this.areaChange();
    }
    jumpLink=(link,dmc)=>{
        appHistory.push({
            pathname: link,
            query: {
                dmcTag:dmc,
            },
        })
    }
    render() { 
        const { data,pageCur,pageDatas,pages,areapageDatas,areaData,areaCur } = this.props;
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const pagination = {
          total: pageDatas,
          current:pageCur,
          //showSizeChanger: true,
          pageSize:20
        };
        const areaPagination = {
            total: areapageDatas,
            current:areaCur,
            //showSizeChanger: true,
        };
        let derectUp = 'up',derectDown = 'down';
        const columns = [{
            title: '活跃状态',
            width: 80,
            dataIndex: 'activeStatus',
            key: 'activeStatus',
            render:(text)=>(text) === 'Y' ? (<span style={{ width: 80 }}>活跃</span>) : (<span style={{ width: 80 }}>-</span>),
            sorter:true,
            sortOrder: sortedInfo.columnKey === 'activeStatus' && sortedInfo.order,
            filteredValue: filteredInfo.activeStatus || '',
        },
        {
            title: 'DMC名称',
            dataIndex: 'dmcName',
            key: 'dmcName',
            width: 200,
            render:(text)=><span title={text} className="ellips width200">{text}</span>,
            sorter: true,
            sortOrder: sortedInfo.columnKey === 'dmcName' && sortedInfo.order,
            filteredValue: filteredInfo.dmcName || '',
        }, {
            title: 'DMS数量',
            dataIndex: 'dmsCnt',
            key: 'dmsCnt',
            width: 150,
            render:(text,record)=> <a href="javascript:;" className="ellips width150" onClick={()=>this.jumpLink('dms',record.dmcTag)} >{text + ((record.activeDmsCnt) ? '(活跃'+ (record.activeDmsCnt)+')' :'')}</a>,
            sorter: true,
            sortOrder: sortedInfo.columnKey === 'dmsCnt' && sortedInfo.order,
        }, {
            title: '活跃流数量',
            dataIndex: 'streamCnt',
            key: 'streamCnt',
            width: 150,
            render:(text,record)=><a href="javascript:;" title={text} className="ellips width150" onClick={()=>this.jumpLink('flow',record.dmcTag)} >{text + ((record.syncStreamCnt) ? '(同步'+ (record.syncStreamCnt)+')' :'')}</a>,
            sorter: true,
            sortOrder: sortedInfo.columnKey === 'streamCnt' && sortedInfo.order,
        }, {
            title: '上行',
            children: [{
                title: '流量',
                width: 90,
                dataIndex: 'upBps',
                key: 'upBps',
                render: text => <span title={text} title={text} className="ellips width90">{text}</span>,
                sorter: true,
                sortOrder: sortedInfo.columnKey === 'upBps' && sortedInfo.order,
            }, {
                title: '区域分布',
                width: 80,
                dataIndex: 'upAreaCnt',
                key: 'upAreaCnt',
                render: (text,record) =>(text > 0)?<a href="javascript:;"  className="c-modle" title={text} className="ellips width80" onClick={()=>this.showModal(record.dmcTag,'up')}>{text}</a>:(text),
                sorter: true,
                sortOrder: sortedInfo.columnKey === 'upAreaCnt' && sortedInfo.order,
            }],
        }, {
            title: '下行',
            children: [{
                title: '客户端',
                dataIndex: 'subscriptionCnt',
                key: 'subscriptionCnt',
                width:140,
                render: (text,record) => <a href="javascript:;" title={text} className="ellips width140" onClick={()=>this.jumpLink('zen',record.dmcTag)}>{text}</a>,
                sorter:true,
                sortOrder: sortedInfo.columnKey === 'subscriptionCnt' && sortedInfo.order,
            }, {
                title: '独立IP',
                dataIndex: 'ipCnt',
                key: 'ipCnt',
                width:200,
                render: (text,record) => <a href="javascript:;" title={text} className="ellips width200" onClick={()=>this.jumpLink('independentIp',record.dmcTag)}>{text}</a>,
                sorter: true,
                sortOrder: sortedInfo.columnKey === 'ipCnt' && sortedInfo.order,
            }, {
                title: '流量',
                width: 90,
                dataIndex: 'downBps',
                key: 'downBps',
                render: text => <span title={text} className="ellips width90">{text}</span>,
                sorter: true,
                sortOrder: sortedInfo.columnKey === 'downBps' && sortedInfo.order,
            }, {
                title: '区域分布',
                width: 80,
                dataIndex: 'downAreaCnt',
                key: 'downAreaCnt',
                render: (text,record) =>(<a href="javascript:;" className="c-modle" title={text} className="ellips width80" onClick={()=>this.showModal(record.dmcTag,'down')}>{text}</a>),
                sorter: true,
                sortOrder: sortedInfo.columnKey === 'downAreaCnt' && sortedInfo.order,
            }, {
                title: '丢包率',
                width: 60,
                dataIndex: 'subscriptionDropRate',
                key: 'subscriptionDropRate',
                render: text => <span title={text} className="ellips width60" >{text}</span>,
                sorter: true,
                sortOrder: sortedInfo.columnKey === 'subscriptionDropRate' && sortedInfo.order,
            }],
        }, {
            title: '图形',
            width: 50,
            dataIndex: 'viewStatus',
            key: 'viewStatus',
            render:(text, record)=>(text) === 'Y' ? (<a href="javascript:;" className="c-modle" style={{ width:50 }} onClick={()=>this.jumpLink('elapse',record.dmcTag)} >查看</a>) : (<span className="c-modle" style={{ width: 50 }}>-</span>),
        }];
        return (
            <div id="dmc">
                <Topone title={this.state.titleName} name={this.state.name} />
                <Search valSearch={this.valSearch.bind(this)} dmcTag={(this.props.location.query.dmcTag) ? this.props.location.query.dmcTag :''} dmcName={(this.props.location.query.dmcName) ? this.props.location.query.dmcName :''} dmsTag={(this.props.location.query.dmsTag) ? this.props.location.query.dmsTag :''} />
                <ReactInterval timeout={this.state.timeout} enabled={true} callback={()=>{this.handleChange();this.tick();}} />
                <Timebar itemNum={(pageDatas) ? pageDatas : 0} ref="getTime" handleMenuClick={this.handleMenuClick} timeName={this.state.timeName} newTime={this.state.newTime}/>
                <Table columns={columns} rowKey={(record,key) => key} dataSource={this.state.data} onChange={this.handleChange} pagination={pagination} />
                <Modaldia key={this.state.key} visible={this.state.isVisible} modalSource={this.state.areaData} del={() => this.modalCancel()}  onChange={this.areaChange} pagination={areaPagination} />
            </div>
        );
    }
};
export default Counter;
