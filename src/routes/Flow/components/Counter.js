import React from 'react';
import { ReactInterval } from 'react-interval';
import moment from 'moment';
import { Table,Input,Button,Select } from 'antd';
import './flow.css';
import Search from './Search';
import Topone from '../../../components/common/TopOne';
import Timebar from '../../../components/common/Time';
import Modaldia from './Modal';
import SyncModal from './SyncModal';


import {hashHistory} from 'react-router';
import {createHashHistory} from 'history';
var routerHistory =  require('react-router').useRouterHistory;  
const appHistory = routerHistory(createHashHistory)({queryKey:false});  

const { Column, ColumnGroup } = Table;
const Option = Select.Option;
let dmcList = '';
class Counter extends React.Component {
  state = {
      filterDropdownVisible: false,
      filteredInfo: null,
      sortedInfo: null,
      loading: false,
      isVisible:false,
      syncVisible:false,
      key:Math.random(),
      synckey:Math.random(),
      titleName:'活跃流',
      timeName:'1分钟',
      timeout:60000,
      newTime:moment().format('YYYY-MM-DD HH:mm'),
      name:'flow'
  }
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
    if (this.props.areaData !== nextProps.areaData) {
        this.setState({areaData:nextProps.areaData});
    } 
    if (this.props.syncData !== nextProps.syncData) {
      this.setState({syncData:nextProps.syncData});
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
          filtersField={dmcTag:'',dmsTag:'',isSync:'',streamName:''};
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
  modalCancel = (e) => {
    this.setState({ isVisible: false });
  }
  syncCancel=(e)=>{
    this.setState({ syncVisible: false });
  }
  showModal = (stream) => {
      let newKey = parseInt(8 * Math.random());
      this.setState({ key: newKey });
      this.setState({ isVisible: true });
      this.params = {streamName:stream}
      this.areaChange();
  }
  syncModal= (stream) => {
    let newKey = parseInt(10 * Math.random());
    this.setState({ synckey: newKey });
    this.setState({ syncVisible: true });
    this.params = {streamName:stream}
    this.syncChange();
  }
  areaChange = (pagination)=>{
    let _this = this,pageParams={},filtersField={};
    if(_this.params === undefined || _this.params === ''){
        filtersField={streamName:''};
      }else{
        Object.assign(filtersField, _this.params);
      }
    if(pagination){
        pageParams = { curPage: pagination.current, pageSize: pagination.pageSize };
    }else{
        pageParams = { curPage: 1, pageSize: 10 };
    }
    const areaParams = Object.assign({}, pageParams,filtersField);
    this.props.getArea(areaParams); 
  }
  syncChange = (pagination)=>{
    let _this = this,pageParams={},filtersField={};
    if(_this.params === undefined || _this.params === ''){
        filtersField={streamName:''};
      }else{
        Object.assign(filtersField, _this.params);
      }
    if(pagination){
        pageParams = { curPage: pagination.current, pageSize: pagination.pageSize };
    }else{
        pageParams = { curPage: 1, pageSize: 10 };
    }
    const params = Object.assign({}, pageParams,filtersField);
    this.props.getSyncData(params); 
  }
//   jumpLink=(link,dmc)=>{
//       appHistory.push({
//           pathname: link,
//           query: {
//               dmcTag:dmc,
//           },
//       })
//   }
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
  render() {
    let self = this;
    const { data,pageCur,pageDatas,pages,areapageDatas,areaData,syncData,syncpageDatas,areaPageCur,syncPageCur } = this.props;
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const pagination = {
      total: pageDatas,
      current:pageCur,
     // showSizeChanger: true,
     pageSize:20
    };
    const areaPagination = {
        total: areapageDatas,
        current:areaPageCur,
        //showSizeChanger: true,
    };
    const syncPagination = {
      total: syncpageDatas,
      current:syncPageCur,
      //showSizeChanger: true,
  };
    /*table列*/
    const columns = [{
      title: '流名称',
      dataIndex: 'streamName',
      key: 'streamName',
      width: 250,
      render:(text)=><span title={text} className="ellips width250">{text}</span>,
      sorter:true,
      filteredValue: filteredInfo.streamName || '',
      sortOrder: sortedInfo.columnKey === 'streamName' && sortedInfo.order,
    },
    {
      title: 'DMC名称',
      dataIndex: 'dmcList',
      key: 'dmcList',
      width: 100,
      render: (text,record) => {
        return(
          record.dmcList && record.dmcList.map(function(item,index){
            return <a href="javascript:;" title={item.dmcName} className="ellips width100" onClick={()=>self.jumpDmc('dmc',item.dmcName)}>
                    {item.dmcName}
                   </a>
        })
      )},
      filteredValue: filteredInfo.dmcTag || '',
    }, {
      title: 'DMS名称',
      dataIndex: 'dmsList',
      key: 'dmsList',
      width: 100,
      render: (text,record) => {
        return(
            record.dmsList &&  record.dmsList.map(function(item,index){
            return <a href="javascript:;" title={item.dmsName} className="ellips width100" onClick={()=>self.jumpDms('dms',item.dmsName)}>
                      {item.dmsName}
                    </a>
          })
      )},
    },{
      title: '是否同步流',
      width:90,
      dataIndex: 'syncFlag',
      key: 'syncFlag',
      render: text => <span title={text} className="ellips width90">{text}</span>,
      sorter: true,
      filteredValue: filteredInfo.isSync || '',
      sortOrder: sortedInfo.columnKey === 'isSync' && sortedInfo.order,
    },{
      title: '流开始时间',
      width:130,
      dataIndex: 'beginTime',
      key: 'beginTime',
      render: text => <span title={text} className="ellips width130">{text}</span>,
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'beginTime' && sortedInfo.order,
    },{
      title: '流属性',
        children: [{
          title: '分辨率',
          width:80,
           dataIndex: 'resolution',
           key: 'resolution',
           render: text => <span title={text} className="ellips width80">{text}</span>,
           sorter:true,
           sortOrder: sortedInfo.columnKey === 'resolution' && sortedInfo.order,
        }, {
            title: '帧率',
            width:50,
            dataIndex: 'frameRate',
            key: 'frameRate',
            render:(text)=>(<span title={text} className="ellips width50">{text}</span>),
            sorter: true,
            sortOrder: sortedInfo.columnKey === 'frameRate' && sortedInfo.order,
        }], 
      },{
      title: '上行',
        children: [{
          title: '流量',
          width:90,
           dataIndex: 'publishFlow',
           key: 'publishFlow',
           render: text => <span title={text} className="ellips width90">{text}</span>,
           sorter: true,
           sortOrder: sortedInfo.columnKey === 'publishFlow' && sortedInfo.order,
        },{
            title: '客户端',
            width:140,
            dataIndex: 'publishClient',
            key: 'publishClient',
            render: (text,record) => <span title={text} className="ellips width140">{text}</span>,
            sorter: true,
            sortOrder: sortedInfo.columnKey === 'publishClient' && sortedInfo.order,
        },{
            title: '区域',
            dataIndex: 'publishArea',
            key: 'publishArea',
            render: text => <span>{text}</span>,
            sorter: true,
            sortOrder: sortedInfo.columnKey === 'publishArea' && sortedInfo.order,
        }], 
      },{
        title: '下行',
        children: [{
          title: '客户端',
          width:140,
          dataIndex: 'subClientNum',
          key: 'subClientNum',
          render: (text,record) => (text > 0)?<a href="javascript:;" title={text} className="ellips width140" onClick={()=>this.jumpFlow('zen',record.streamName)}>{text}</a>:text,
          sorter: true,
          sortOrder: sortedInfo.columnKey === 'subClientNum' && sortedInfo.order,
        }, {
            title: '独立IP',
            dataIndex: 'subIpNum',
            key: 'subIpNum',
            render: (text,record) =>  (text > 0)?<a href="javascript:;" onClick={()=>this.jumpFlow('independentIp',record.streamName)}>{text}</a>:text,
            sorter: true,
            sortOrder: sortedInfo.columnKey === 'subIpNum' && sortedInfo.order,
        },{
            title: '流量',
            width:90,
            dataIndex: 'subFlow',
            key: 'subFlow',
            render: text => <span title={text} className="ellips width90">{text}</span>,
            sorter: true,
            sortOrder: sortedInfo.columnKey === 'subFlow' && sortedInfo.order,
        },{
            title: '区域分布',
            width:80,
            dataIndex: 'subAreaNum',
            key: 'subAreaNum',
            render: (text,record) => (text > 0)?<a href="javascript:;" title={text} className="ellips width80" onClick={()=>this.showModal(record.streamName)}>{text}</a>:text,
            sorter: true,
            sortOrder: sortedInfo.columnKey === 'subAreaNum' && sortedInfo.order,
        },{
            title: '丢包率',
            width:64,
            dataIndex: 'subDropRate',
            key: 'subDropRate',
            render: text => <span title={text} className="ellips width60">{text}</span>,
            sorter: true,
            sortOrder: sortedInfo.columnKey === 'subDropRate' && sortedInfo.order,
        }], 
        },{
            title: '图形',
            width:50,
            dataIndex: 'graph',
            key: 'graph',
            render:(text, record)=><a href="javascript:;" className="c-modle" style={{ width:50 }} onClick={()=>this.jumpFlow('elapse',record.streamName)} >查看</a>,
        },{
            title: '同步',
              children: [{
                title: '同步路数',
                 dataIndex: 'syncNum',
                 key: 'syncNum',
                  render: (text,record) => (text > 0)?<a href="javascript:;" onClick={()=>this.syncModal(record.streamName)}>{text}</a>:text,
                 sorter: true,
                 sortOrder: sortedInfo.columnKey === 'syncNum' && sortedInfo.order,
              },{
                title: '流量',
                width:90,
                dataIndex: 'syncFlow',
                key: 'syncFlow',
                render: text => <span title={text} className="ellips width90">{text}</span>,
                sorter: true,
                sortOrder: sortedInfo.columnKey === 'syncFlow' && sortedInfo.order,
              },{
                title: '丢包率',
                width:64,
                dataIndex: 'syncDropRate',
                key: 'syncDropRate',
                render: text => <span title={text} className="ellips width60">{text}</span>,
                sorter: true,
                sortOrder: sortedInfo.columnKey === 'syncDropRate' && sortedInfo.order,
              }], 
            }];
        return (
            <div id="flow">
                <Topone title={this.state.titleName} name={this.state.name} />
                <Search valSearch={this.valSearch.bind(this)} dmcTag={(this.props.location.query.dmcTag) ? this.props.location.query.dmcTag :''} dmsTag={(this.props.location.query.dmsTag) ? this.props.location.query.dmsTag :''} streamName={(this.props.location.query.streamName) ? this.props.location.query.streamName :''} isSync={(this.props.location.query.isSync) ? this.props.location.query.isSync :''}/>
                <ReactInterval timeout={this.state.timeout} enabled={true} callback={()=>{this.handleChange();this.tick();}} />
                <Timebar itemNum={(pageDatas) ? pageDatas : 0} ref="getTime" handleMenuClick={this.handleMenuClick} timeName={this.state.timeName} newTime={this.state.newTime}/>
                <Table rowKey={(record,key)=>key} columns={columns} dataSource={this.state.data} onChange={this.handleChange} pagination={pagination} />
                <Modaldia newKey={this.state.key} visible={this.state.isVisible} modalSource={this.state.areaData} del={() => this.modalCancel()}  onChange={this.areaChange} pagination={areaPagination} />
                <SyncModal newKey={this.state.synckey} visible={this.state.syncVisible} modalSource={this.state.syncData} del={() => this.syncCancel()}  onChange={this.syncChange} pagination={syncPagination} />
            </div>
        );
    }
};
export default Counter;