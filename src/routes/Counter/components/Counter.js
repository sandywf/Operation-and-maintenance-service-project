import React from 'react';
import {ReactInterval} from 'react-interval';
import { Table,Input,Button,Select } from 'antd';
import Search from './Search';
import Topone from '../../../components/common/TopOne';
import Timebar from '../../../components/common/Time';
import Modaldia from './Modal';
const { Column, ColumnGroup } = Table;
const Option = Select.Option;
class Counter extends React.Component {
    state = {
        filteredInfo: null,
        sortedInfo: null,
        data:this.props.data,
        dataSource:this.props.data2,
        pagination: {},
        loading: false,
        isVisible:false,
        key:1,
        titleName:'DMC',
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
            title: '独立IP',
            dataIndex: 'indIp',
            key: 'indIp',
            sorter: true,
            filteredValue: filteredInfo.indIp || null,
            onFilter: (value, record) => record.indIp.toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: '区域',
            dataIndex: 'indArea',
            key: 'indArea',
            filterDropdownVisible: this.state.filterDropdownVisible,
            onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }),
            sorter: (a, b) => a.indArea.length - b.indArea.length,
        },{
            title: 'DMC',
            dataIndex: 'indDmc',
            key: 'indDmc',
            render: text => <a href="#">{text}</a>,
            sorter: true,
            filteredValue: filteredInfo.indDmc || null,
            onFilter: (value, record) => record.indDmc.toLowerCase().includes(value.toLowerCase()),
        },{
            title: 'DMS',
            dataIndex: 'indDms',
            key: 'indDms',
            render: text => <a href="#">{text}</a>,
            sorter: (a, b) => a.indDms - b.indDms,
        },{
            title: '活跃流',
            dataIndex: 'indAct',
            key: 'indAct',
            render: text => <a href="#">{text}</a>,
            sorter: (a, b) => a.indAct - b.indAct,
        },{
            title: '上行',
              children: [{
                title: '活跃流数量',
                dataIndex: 'upActflow',
                key: 'upActflow',
                render:(text)=>(<span className="c-modle" onClick={this.showModal}>{text}</span>),
                sorter: (a, b) => a.upActflow - b.upActflow,
            },{
              title: '流量',
              width:90,
              dataIndex: 'indflow',
              key: 'indflow',
              sorter: (a, b) => a.indflow - b.indflow,
            }], 
        },{
            title: '下行',
            children: [{
              title: '活跃流数量',
              dataIndex: 'dActflow',
              key: 'dActflow',
              render:(text)=>(<span className="c-modle" onClick={this.showModal}>{text}</span>),
              sorter: (a, b) => a.dActflow - b.dActflow,
        }, {
            title: '客户端',
            dataIndex: 'dClient',
            key: 'dClient',
            render: text => <a href="#">{text}</a>,
            sorter: (a, b) => a.dClient - b.dClient,
        },{
            title: '流量',
            width:90,
            dataIndex: 'dflow',
            key: 'dflow',
            sorter: (a, b) => a.dflow - b.dflow,
        },{
            title: '丢包率',
            width:64,
            dataIndex: 'packet',
            key: 'packet',
            sorter: (a, b) => a.packet - b.packet,
        }], 
    }];
{/*数据渲染*/}
    return (
            <div id="indClient">
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

