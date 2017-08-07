import React from 'react';
import {ReactInterval} from 'react-interval';
import { Table,Input,Button,Select } from 'antd';
import Search from './Search';
import Topone from '../../../components/common/TopOne';
import Timebar from '../../../components/common/Time';
const { Column, ColumnGroup } = Table;
const Option = Select.Option;

class Counter extends React.Component {
    state={
      filterDropdownVisible: false,
      filteredInfo: null,
      sortedInfo: null,
      data:this.props.data,
      dataSource:this.props.data2,
      titleName:'订阅客户端',
    };
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
    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        /*table列*/
        const columns = [{
            title: '客户端',
            dataIndex: 'cClient',
            key: 'cClient',
            sorter: (a, b) => a.cClient.length - b.cClient.length,
        },
        {
            title: 'DMC名称',
            dataIndex: 'cDmc',
            key: 'cDmc',
            render: text => <a href="#">{text}</a>,
            sorter:true,
            filteredValue: filteredInfo.cDmc || null,
            onFilter: (value, record) => record.cDmc.toLowerCase().includes(value.toLowerCase()),
        }, {
            title: 'DMS名称',
            dataIndex: 'cDms',
            key: 'cDms',
            render: text => <a href="#">{text}</a>,
            sorter: (a, b) => a.cDms - b.cDms,
        },{
            title: '流名称',
            dataIndex: 'cFlow',
            key: 'cFlow',
            render: text => <a href="#">{text}</a>,
            sorter:true,
            filteredValue: filteredInfo.cFlow || null,
            onFilter: (value, record) => record.cFlow.toLowerCase().includes(value.toLowerCase()),
        },{
            title: '独立IP',
            dataIndex: 'cIp',
            key: 'cIp',
            render: text => <a href="#">{text}</a>,
            sorter:true,
            filteredValue: filteredInfo.cIp || null,
            onFilter: (value, record) => record.cIp.toLowerCase().includes(value.toLowerCase()),
        },{
            title: '流开始时间',
            width:130,
            dataIndex: 'flowTime',
            key: 'flowTime',
            sorter: (a, b) => a.flowTime - b.flowTime,
        },{
            title: '客户端开始时间',
            width:140,
            dataIndex: 'clientTime',
            key: 'clientTime',
            sorter: (a, b) => a.clientTime - b.clientTime,
        },{
            title: '流属性',
            children: [{
                title: '分辨率',
                width:80,
                dataIndex: 'cResolve',
                key: 'cResolve',
                sorter: (a, b) => a.cResolve - b.cResolve,
            }, {
                title: '帧率',
                width:50,
                dataIndex: 'cRate',
                key: 'cRate',
                sorter: (a, b) => a.cRate - b.cRate,
            }], 
        },{
            title: '下行',
            children: [{
            title: '流量',
            width:90,
            dataIndex: 'dFlow',
            key: 'dFlow',
            sorter: (a, b) => a.dFlow - b.dFlow,
        },{
            title: '区域',
            dataIndex: 'cArea',
            key: 'cArea',
            sorter: (a, b) => a.cArea - b.cArea,
        },{
            title: '丢包率',
            width:64,
            dataIndex: 'packet',
            key: 'packet',
            sorter: (a, b) => a.packet - b.packet,
        }], 
      }];
    return   (
            <div id="zen">
                <Topone title={this.state.titleName} />
                <Search valSearch={this.valSearch.bind(this)} />
                <Timebar itemNum={this.state.data.length} />
                <Table columns={columns} dataSource={this.state.data} onChange={this.handleChange} />
            </div>
        );
    }
};
export default Counter;