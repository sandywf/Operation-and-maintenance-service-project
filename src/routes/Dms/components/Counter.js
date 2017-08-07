import React from 'react';
import {ReactInterval} from 'react-interval';
import { Table,Input,Button,Select } from 'antd';
import Search from './Search';
import Topone from '../../../components/common/TopOne';
import Timebar from '../../../components/common/Time';
import Modaldia from './Modal';
const { Column, ColumnGroup } = Table;
const Option = Select.Option;

/*页面事件部分 start*/
class Counter extends React.Component {
    state = {
        filterDropdownVisible: false,
        filteredInfo: null,
        data:this.props.data,
        dataSource:this.props.data2,
        pagination: {},
        loading: false,
        isVisible:false,
        key:1,
        titleName:'DMS',
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
            title: '活跃状态',
            width:80,
            dataIndex: 'active',
            key: 'active',
            render: (text,record) => <span title={text} style={{width:80}}>{text}</span>,
            sorter: true,
            filteredValue: filteredInfo.active || null,
            onFilter: (value, record) => record.active == value,
            },{
              title: '在线状态',
              width: 80,
              dataIndex: 'online',
              key: 'online',
              sorter: true,
              filteredValue: filteredInfo.online || null,
              onFilter: (value, record) => record.online == value,
            },
            {
              title: 'DMS名称',
              dataIndex: 'dmsname',
              key: 'dmsname',
              filteredValue: filteredInfo.dmsname || null,
              onFilter: (value, record) => record.dmsname.toLowerCase().includes(value.toLowerCase()),
              sorter: true,
            },{
              title: 'DMC名称',
              dataIndex: 'name',
              key: 'name',
              render: text => <span title={text}>{text}</span>,
              filteredValue: filteredInfo.name || null,
              onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
              sorter: true,
            },{
                title: 'Domain',
                width:72,
                dataIndex: 'domain',
                key: 'domain',
                sorter: (a, b) => a.domain - b.domain,
            },{
                title: '服务器类型',
                width:96,
                dataIndex: 'server',
                key: 'server',
                sorter: true,
                filteredValue: filteredInfo.server || null,
                onFilter: (value, record) => record.server == value,
            },{
                title: '服务地址',
                dataIndex: 'svraddress',
                key: 'svraddress',
                render:(text)=>(<a href="#" type="primary" onClick={this.showModal}>{text}</a>),
                sorter: (a, b) => a.svraddress - b.svraddress,
            },{
                title: '错误报告',
                dataIndex: 'msg',
                key: 'msg',
                render:(text)=>(<a href="#" type="primary" onClick={this.showModal}>{text}</a>),
                sorter: (a, b) => a.msg - b.msg,
            },{
                title: '活跃流数量',
                dataIndex: 'activenum',
                key: 'activenum',
                render: text => <a href="#">{text}</a>,
                sorter: (a, b) => a.activenum - b.activenum,
            },{
                title: '上行',
                children: [{
                    title: '流量',
                    width:90,
                    dataIndex: 'upflow',
                    key: 'upflow',
                    sorter: (a, b) => a.upflow - b.upflow,
                }, {
                title: '区域分布',
                width:80,
                dataIndex: 'uparea',
                key: 'uparea',
                render:(text)=>(<a href="#" type="primary" onClick={this.showModal}>{text}</a>),
                    sorter: (a, b) => a.uparea - b.uparea,
                }], 
            },{
                title: '下行',
                children: [{
                    title: '客户端',
                    dataIndex: 'client',
                    key: 'client',
                    render: text => <a href="#">{text}</a>,
                    sorter: (a, b) => a.client - b.client,
                }, {
                    title: '独立IP',
                    dataIndex: 'ip',
                    key: 'ip',
                    render: text => <a href="#">{text}</a>,
                    sorter: (a, b) => a.ip - b.ip,
                },{
                    title: '流量',
                    width:90,
                    dataIndex: 'dflow',
                    key: 'dflow',
                    sorter: (a, b) => a.dflow - b.dflow,
                },{
                    title: '区域分布',
                    width:80,
                    dataIndex: 'darea',
                    key: 'darea',
                    render:(text)=>(<a href="#" type="primary" onClick={this.showModal}>{text}</a>),
                    sorter: (a, b) => a.darea - b.darea,
                },{
                    title: '丢包率',
                    width:64,
                    dataIndex: 'packet',
                    key: 'packet',
                    sorter: (a, b) => a.packet - b.packet,
                }]},{
                title: '图形',
                width:50,
                dataIndex: 'graph',
                key: 'graph',
                render: text => <a href="#">{text}</a>,
                sorter: (a, b) => a.graph - b.graph,
            },{
                title: '操作',
                dataIndex: 'operate',
                key: 'operate',
                sorter: (a, b) => a.operate - b.operate,
            }];
            return (
                <div id="dms">
                    <Topone title={this.state.titleName} />
                    <Search valSearch={this.valSearch.bind(this)} />
                    <Timebar itemNum={this.state.data.length} />
                    {/*<ReactInterval  timeout={this.state.time} enabled={true} callback={()=>this.props.getDMCData()} />*/}
                    <Table columns={columns} dataSource={this.state.data} onChange={this.handleChange} />
                    <Modaldia newKey={this.state.key} visible={this.state.isVisible} modalSource={this.state.dataSource} del = {()=>this.modalCancel()}/>
                </div>
            );
        }
};
export default Counter;