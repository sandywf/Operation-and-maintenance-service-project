import React from 'react';
import { ReactInterval } from 'react-interval';
import moment from 'moment';
import { Table,Input,Button,Select } from 'antd';
import Search from './Search';
import Topone from '../../../components/common/TopOne';
import Timebar from '../../../components/common/Time';
import Modaldia from './Modal';
import AddressModal from './AddressModal';
import ErrorModal from './ErrorModal';

import {hashHistory} from 'react-router';
import {createHashHistory} from 'history';
var routerHistory =  require('react-router').useRouterHistory;  
const appHistory = routerHistory(createHashHistory)({queryKey:false});  

const { Column, ColumnGroup } = Table;
const Option = Select.Option;

/*页面事件部分 start*/
class Counter extends React.Component {
    state = {
        filteredInfo: null,
        sortedInfo: null,
        data:this.props.data,
        dataSource:this.props.data2,
        loading: false,
        isVisible:false,
        addressVisible:false,
        errorVisible:false,
        key:1,
        titleName:'DMS',
        errorDmstag:'',
        timeName:'1分钟',
        timeout:60000,
        newTime:moment().format('YYYY-MM-DD HH:mm'),
        name:'dms'
    }
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.filter = '';
        this.timeoutId = '';
    }

    /*真实的DOM被渲染出来后调用*/
    componentDidMount(){
        if(!this.props.location.search){
            this.props.getDMSData();
        }
       // this.props.getDMSData();
    }
  /*组件接收到新的props时调用*/
    componentWillReceiveProps(nextProps){ 
        if (this.props.data !== nextProps.data) {
          this.setState({data:nextProps.data});
        }         
        if (this.props.areaData !== nextProps.areaData) {
            this.setState({areaData:nextProps.areaData});
        } 
        if (this.props.addressData !== nextProps.addressData) {
            this.setState({addressData:nextProps.addressData});
        } 
        if (this.props.errorData !== nextProps.errorData) {
            this.setState({errorData:nextProps.errorData});
        } 
    }
    handleMenuClick =(e)=>{
        this.setState({timeName: e.domEvent.currentTarget.innerHTML});
        this.setState({timeout:parseInt(e.key)});
    }
    tick() {
        this.setState({newTime:moment().format('YYYY-MM-DD HH:mm')});
    }
    handleChange = (pagination,filters,sorter={}) => {
        let _this = this,pageParams={},filtersField={},sortParams={};
        if(pagination){
            pageParams = { curPage: pagination.current, pageSize: pagination.pageSize };
        }else{
            pageParams = { curPage: 1, pageSize: 20 };
        }
        if(_this.filter === undefined || _this.filter === ''){
          filtersField={dmcTag:'',dmsName:'',isAlive:'',isOnline:'',serverType:''};
        }else{
          Object.assign(filtersField, _this.filter);
        }
        if (Object.keys(sorter).length !== 0) {
            const sortMethod = sorter.order === "descend" ? "desc" : "asc";
            sortParams['orderColunm'] = `${sorter.columnKey}`;
            sortParams['orderAsc'] = `${sortMethod}`;
        }  else{
            sortParams['orderColunm'] = '';
            sortParams['orderAsc'] = '';
        }
       const params = Object.assign({}, pageParams,filtersField, sortParams);
       this.props.getDMSData(params);    
    }
    areaChange = (pagination)=>{
        let _this = this,pageParams={},filtersField={};
        if(_this.params === undefined || _this.params === ''){
            filtersField={dmsTag:'',upOrDown:''};
          }else{
            Object.assign(filtersField, _this.params);
          }
        if(pagination){
            pageParams = { curPage: pagination.current, pageSize: pagination.pageSize };
        }else{
            pageParams = { curPage: 1, pageSize: 10 };
        }
        const areaParams = Object.assign({}, pageParams,filtersField);
        this.props.getDMSArea(areaParams); 
    }
    AddressChange =(pagination)=>{
        let _this = this,pageParams={},filtersField={};
        if(_this.params === undefined || _this.params === ''){
            filtersField={dmsTag:''};
          }else{
            Object.assign(filtersField, _this.params);
          }
        if(pagination){
            pageParams = { curPage: pagination.current, pageSize: pagination.pageSize };
        }else{
            pageParams = { curPage: 1, pageSize: 10 };
        }
        const addressParams = Object.assign({}, pageParams,filtersField);
        this.props.getDMSAddress(addressParams); 
    }
    ErrorChange=(pagination)=>{
        let _this = this,pageParams={},filtersField={};
        if(_this.params === undefined || _this.params === ''){
            filtersField={dmsTag:''};
          }else{
            Object.assign(filtersField, _this.params);
          }
        if(pagination){
            pageParams = { curPage: pagination.current, pageSize: pagination.pageSize };
        }else{
            pageParams = { curPage: 1, pageSize: 10 };
        }
        const params = Object.assign({}, pageParams,filtersField);
        this.props.getError(params); 
    }
    valSearch = (values) => {
        this.filter = values;
        this.handleChange();
    }
    modalCancel = (e) => {
        this.setState({ isVisible: false });
    }
    addressCancel=(e)=>{
        this.setState({ addressVisible: false });
    }
    errorCancel=(e)=>{
        this.setState({ errorVisible: false });
    }
    showModal = (tagKey,direction) => {
        let newKey = parseInt(100 * Math.random());
        this.setState({ key: newKey });
        this.setState({ isVisible: true });
        this.params = {dmsTag:tagKey,upOrDown:direction}
        this.areaChange();
    }
    showAddressModal=(tagKey)=>{
        let newKey = parseInt(10 * Math.random());
        this.setState({ key: newKey });
        this.setState({ addressVisible: true });
        this.params = {dmsTag:tagKey}
        this.AddressChange();
    }
 
    showErrorModal=(tagKey)=>{
        let newKey = parseInt(5 * Math.random());
        this.setState({ key: newKey });
        this.setState({ errorVisible: true });
        this.params = {dmsTag:tagKey};
        this.setState({errorDmstag:tagKey});
        this.ErrorChange();
    }
    reset=()=>{
        this.params = {dmsTag:this.state.errorDmstag};
        this.props.resetError(this.params);
        this.setState({ errorVisible: false });
    }
    jumpLink=(link,dmc,dms)=>{
        appHistory.push({
            pathname: link,
            query: {
                dmcTag:dmc,
                dmsTag:dms
            },
        })
    }
    jumpDmc=(link,dmc)=>{
        appHistory.push({
            pathname: link,
            query: {
                dmcName:dmc
            },
        })
    }
    render() {
        const { data,pageCur,pageDatas,pages,areapageDatas,areaData,addressData,addressPageDatas,areaPageCur,addressCur,errorData,errorCur,errorPageDatas} = this.props;
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const pagination = {
          total: pageDatas,
          //showSizeChanger: true,
          current:pageCur,
          pageSize:20
        };
        const areaPagination = {
            total: areapageDatas,
            current:areaPageCur,
           // showSizeChanger: true,
        };
        const addressPagination = {
            total: addressPageDatas,
            current:addressCur,
            //showSizeChanger: true,
        };
        const errorPagination = {
            total: errorPageDatas,
            current:errorCur,
           // showSizeChanger: true,
        };
        let derectUp = 'up',derectDown = 'down';
        /*table列*/
        const columns = [{
                title: '活跃状态',
                width:80,
                dataIndex: 'isAlive',
                key: 'isAlive',
                render:(text)=>(text) === 'Y' ? (<span>活跃</span>) : (<span>-</span>),
                sorter: true,
                sortOrder: sortedInfo.columnKey === 'isAlive' && sortedInfo.order,
                filteredValue: filteredInfo.isAlive || '',
            },{
              title: '在线状态',
              width: 80,
              dataIndex: 'isOnline',
              key: 'isOnline',
              render:(text)=>(text) === 'Y' ? (<span >在线</span>) : (<span>-</span>),
              sorter: true,
              sortOrder: sortedInfo.columnKey === 'isOnline' && sortedInfo.order,
              filteredValue: filteredInfo.isOnline || '',
            },
            {
              title: 'DMS名称',
              dataIndex: 'dmsName',
              key: 'dmsName',
              width: 200,
              render:(text)=><span title={text} className="ellips width200">{text}</span>,
              sorter: true,
              sortOrder: sortedInfo.columnKey === 'dmsTag' && sortedInfo.order,
              filteredValue: filteredInfo.dmsName || '',
            },{
              title: 'DMC名称',
              dataIndex: 'dmcName',
              key: 'dmcName',
              width: 150,
              render:(text,record)=><a href="javascript:;" title={text} className="ellips width150" onClick={()=>this.jumpDmc('dmc',record.dmcName)} >{text}</a>,
              sorter: true,
              sortOrder: sortedInfo.columnKey === 'dmcTag' && sortedInfo.order,
              filteredValue: filteredInfo.dmcTag || '',
            },{
                title: 'Domain',
                width:80,
                dataIndex: 'domain',
                key: 'domain',
                render:(text)=><span title={text} className="ellips width80">{text}</span>,
                sorter: true,
                sortOrder: sortedInfo.columnKey === 'domain' && sortedInfo.order,
            },{
                title: '服务器类型',
                dataIndex: 'serverType',
                key: 'serverType',
                width:80,
                render:(text)=><span title={text} className="ellips width80">{text}</span>,
                sorter: true,
                sortOrder: sortedInfo.columnKey === 'serverType' && sortedInfo.order,
                filteredValue: filteredInfo.serverType || '',
            },{
                title: '服务地址',
                dataIndex: 'serverNum',
                key: 'serverNum',
                width: 80,
                render: (text,record) =><a href="javascript:;"  title={text} className="ellips width80" onClick={()=>this.showAddressModal(record.dmsTag)}>{text}</a>,
                sorter: true,
                sortOrder: sortedInfo.columnKey === 'serverNum' && sortedInfo.order,
            },{
                title: '错误报告',
                dataIndex: 'errorNum',
                key: 'errorNum',
                width: 80,
                render:(text,record)=>(<a href="javascript:;"  title={text} className="ellips width80" onClick={()=>this.showErrorModal(record.dmsTag)}>{text}</a>),
                sorter: true,
                sortOrder: sortedInfo.columnKey === 'errorNum' && sortedInfo.order,
            },{
                title: '活跃流数量',
                dataIndex: 'streamNum',
                key: 'streamNum',
                width:90,
                sorter: true,
                sortOrder: sortedInfo.columnKey === 'streamNum' && sortedInfo.order,
                render:(text,record)=><a href="javascript:;" className="ellips width90" onClick={()=>this.jumpLink('flow',record.dmcTag,record.dmsTag)} >{text + ((record.syncStreamCnt) ? '(同步'+ (record.syncStreamCnt)+')' :'')}</a>,
            },{
                title: '上行',
                children: [{
                    title: '流量',
                    width:90,
                    dataIndex: 'upFlow',
                    key: 'upFlow',
                    render: text => <span title={text} className="ellips width90">{text}</span>,
                    sorter:true,
                    sortOrder: sortedInfo.columnKey === 'upFlow' && sortedInfo.order,
                }, {
                title: '区域分布',
                width:80,
                dataIndex: 'upAreaNum',
                key: 'upAreaNum',
                render: (text,record) =>(text > 0)?(<a href="javascript:;"  className="c-modle ellips width80" title={text} className="ellips width80" onClick={()=>this.showModal(record.dmsTag,derectUp)}>{text}</a>):{text},
                sorter: true,
                sortOrder: sortedInfo.columnKey === 'upAreaNum' && sortedInfo.order,
                }], 
            },{
                title: '下行',
                children: [{
                    title: '客户端',
                    dataIndex: 'downClientNum',
                    key: 'downClientNum',
                    width:60,
                    render: (text,record) => <a href="javascript:;" className="c-modle ellips width60" title={text} onClick={()=>this.jumpLink('zen',record.dmcTag,record.dmsTag)}>{text}</a>,
                    sorter: true,
                    sortOrder: sortedInfo.columnKey === 'downClientNum' && sortedInfo.order,
                }, {
                    title: '独立IP',
                    dataIndex: 'downIpNum',
                    key: 'downIpNum',
                    width:60,
                    render: (text,record) => <a href="javascript:;"  className="c-modle ellips width60" title={text} onClick={()=>this.jumpLink('independentIp',record.dmcTag,record.dmsTag)}>{text}</a>,
                    sorter: true,
                    sortOrder: sortedInfo.columnKey === 'downIpNum' && sortedInfo.order,
                },{
                    title: '流量',
                    width:90,
                    dataIndex: 'downFlow',
                    key: 'downFlow',
                    render: text => <span title={text} className="ellips width90">{text}</span>,
                    sorter:true,
                    sortOrder: sortedInfo.columnKey === 'downFlow' && sortedInfo.order,
                },{
                    title: '区域分布',
                    width:80,
                    dataIndex: 'downAreaNum',
                    key: 'downAreaNum',
                    render: (text,record) =>(text > 0)?(<a href="javascript:;"  className="c-modle ellips width80" title={text} onClick={()=>this.showModal(record.dmsTag,derectDown)}>{text}</a>):{text},
                    sorter: true,
                    sortOrder: sortedInfo.columnKey === 'downAreaNum' && sortedInfo.order,
                },{
                    title: '丢包率',
                    width:60,
                    dataIndex: 'dropRate',
                    key: 'dropRate',
                    render: text => <span title={text} className="ellips width60">{text}</span>,
                    sorter: true,
                    sortOrder: sortedInfo.columnKey === 'dropRate' && sortedInfo.order,
                }]},{
                title: '图形',
                width:50,
                render:(text, record)=><a href="javascript:;" className="c-modle" style={{ width:50 }} onClick={()=>this.jumpLink('elapse',record.dmcTag,record.dmsTag)} >查看</a>,
            }];
            return (
                <div id="dms">
                    <Topone title={this.state.titleName} name={this.state.name} />
                    <Search valSearch={this.valSearch.bind(this)} dmcTag={(this.props.location.query.dmcTag) ? this.props.location.query.dmcTag :''} dmsName={(this.props.location.query.dmsName) ? this.props.location.query.dmsName :''} />
                    {<ReactInterval timeout={this.state.timeout} enabled={true} callback={()=>{this.handleChange();this.tick();}} />}
                    <Timebar itemNum={(pageDatas) ? pageDatas : 0} ref="getTime" handleMenuClick={this.handleMenuClick} timeName={this.state.timeName} newTime={this.state.newTime}/>
                    <Table rowKey={(record,key) => key} rowClassName={(record) => record.errorNum !== '0' ? 'error-color' : ''} columns={columns} dataSource={this.state.data} onChange={this.handleChange} pagination={pagination} />
                    <Modaldia newKey={this.state.key} visible={this.state.isVisible} modalSource={this.state.areaData} del={() => this.modalCancel()} onChange={this.areaChange} pagination={areaPagination} />
                    <AddressModal newKey={this.state.key} visible={this.state.addressVisible} modalSource={this.state.addressData} del={() => this.addressCancel()} onChange={this.AddressChange} pagination={addressPagination} />
                    <ErrorModal newKey={this.state.key} visible={this.state.errorVisible} modalSource={this.state.errorData} del={() => this.errorCancel()} onChange={this.ErrorChange} pagination={errorPagination} reset = {this.reset} />
                </div>
            );
        }
};
export default Counter;