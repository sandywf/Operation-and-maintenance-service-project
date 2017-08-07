import React from 'react';
import {ReactInterval} from 'react-interval';
import { Table,Input,Button,Select } from 'antd';
import './flow.css';
import Search from './Search';
import Topone from '../../../components/common/TopOne';
import Timebar from '../../../components/common/Time';
import Modaldia from './Modal';
const { Column, ColumnGroup } = Table;
const Option = Select.Option;

class Counter extends React.Component {
  state = {
      filterDropdownVisible: false,
      filteredInfo: null,
      sortedInfo: null,
      data:this.props.data,
      dataSource:this.props.data2,
      pagination: {},
      loading: false,
      isVisible:false,
      key:1,
      titleName:'活跃流',
  }
  constructor(props) {
        super(props);
        this.filter = '';
        this.timeoutId = '';
  }
  /*真实的DOM被渲染出来后调用*/
  componentDidMount(){
    this.props.getMENUData();
    if(!this.props.data || !this.props.data.listData){
      this.props.getKHData();
    }
  }
  /*组件接收到新的props时调用*/
  componentWillReceiveProps(props){ 
   console.log("componentWillReceiveProps", props);
    if(props.data.length != 0){
      this.setState({data:props.data});
      this.setState({dataSource:props.data2});
    }
  }
  handleChange=(pagination, filters, sorter) =>{
       let _this = this;
       this.setState({
           filteredInfo: this.filter,
       });
  }
  valSearch =(searchContent) =>{
    this.filter = searchContent;
    this.handleChange();
  }
  modalCancel=(e)=>{
    this.setState({isVisible:false});
  }
  showModal=()=>{
    let newKey = parseInt(100*Math.random());
    this.setState({key:newKey});
    this.setState({isVisible:true});
  }
  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    /*table列*/
    const columns = [{
      title: '流名称',
      dataIndex: 'flowName',
      key: 'flowName',
      sorter:true,
      filteredValue: filteredInfo.flowName || null,
      onFilter: (value, record) => record.flowName.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'DMC名称',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="#">{text}</a>,
      sorter:true,
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
    }, {
      title: 'DMS名称',
      dataIndex: 'dmsname',
      key: 'dmsname',
      render: text => <a href="#">{text}</a>,
      sorter: (a, b) => a.dmsname - b.dmsname,
    },{
      title: '是否同步流',
      width:96,
      dataIndex: 'synchro',
      key: 'synchro',
      sorter: (a, b) => a.active.length - b.active.length,
      filteredValue: filteredInfo.synchro || null,
      onFilter: (value, record) => record.synchro == value,
    },{
      title: '流开始时间',
      width:130,
      dataIndex: 'starttime',
      key: 'starttime',
      sorter: (a, b) => a.starttime - b.starttime,
    },{
      title: '流属性',
        children: [{
          title: '分辨率',
          width:80,
           dataIndex: 'resolving',
           key: 'resolving',
           sorter: (a, b) => a.resolving - b.resolving,
        }, {
            title: '帧率',
            width:50,
            dataIndex: 'frameRate',
            key: 'frameRate',
            render:(text)=>(<span className="c-modle" onClick={this.showModal}>{text}</span>),
            sorter: (a, b) => a.frameRate - b.frameRate,
        }], 
      },{
      title: '上行',
        children: [{
          title: '流量',
          width:90,
           dataIndex: 'upflow',
           key: 'upflow',
           sorter: (a, b) => a.upflow - b.upflow,
        },{
            title: '客户端',
            width:140,
            dataIndex: 'upClient',
            key: 'upClient',
            sorter: (a, b) => a.upClient - b.upClient,
        },{
            title: '区域',
            dataIndex: 'uparea',
            key: 'uparea',
            sorter: (a, b) => a.uparea - b.uparea,
        }], 
      },{
        title: '下行',
        children: [{
          title: '客户端',
          dataIndex: 'downClient',
          key: 'downClient',
          render: text => <a href="#">{text}</a>,
          sorter: (a, b) => a.downClient - b.downClient,
        }, {
            title: '独立IP',
            dataIndex: 'ip',
            key: 'ip',
            render: text => <a href="#">{text}</a>,
            sorter: (a, b) => a.ip - b.ip,
        },{
            title: '流量',
            width:90,
            dataIndex: 'dFlow',
            key: 'dFlow',
            sorter: (a, b) => a.dFlow - b.dFlow,
        },{
            title: '区域分布',
            width:80,
            dataIndex: 'dArea',
            key: 'dArea',
            render:(text)=>(<a href="#" type="primary" onClick={this.showModal}>{text}</a>),
            sorter: (a, b) => a.dArea - b.dArea,
        },{
            title: '丢包率',
            width:64,
            dataIndex: 'dPacket',
            key: 'dPacket',
            sorter: (a, b) => a.dPacket - b.dPacket,
        }], 
        },{
            title: '图形',
            width:50,
            dataIndex: 'graph',
            key: 'graph',
            render: text => <a href="#">{text}</a>,
            sorter: (a, b) => a.graph - b.graph,
        },{
            title: '同步',
              children: [{
                title: '同步路数',
                 dataIndex: 'synch',
                 key: 'synch',
                  render:(text)=>(<span className="c-modle" onClick={this.showModal}>{text}</span>),
                 sorter: (a, b) => a.synch - b.synch,
              },{
                title: '流量',
                width:90,
                dataIndex: 'synchFlow',
                key: 'synchFlow',
                sorter: (a, b) => a.synchFlow - b.synchFlow,
              },{
                title: '丢包率',
                width:64,
                dataIndex: 'synchPacket',
                key: 'synchPacket',
                sorter: (a, b) => a.synchPacket - b.synchPacket,
              }], 
            }];
        return (
            <div id="flow">
                <Topone title={this.state.titleName} />
                <Search valSearch={this.valSearch.bind(this)} />
                <Timebar itemNum={this.state.data.length} />
                <Table columns={columns} dataSource={this.state.data} onChange={this.handleChange} />
                <Modaldia newKey={this.state.key} visible={this.state.isVisible} modalSource={this.state.dataSource} del = {()=>this.modalCancel()}/>
            </div>
        );
    }
};
export default Counter;