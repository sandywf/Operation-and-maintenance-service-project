import React from 'react';
import { ReactInterval } from 'react-interval';
import { Table, Input, Button, Select } from 'antd';
import Search from './Search';
import Topone from '../../../components/common/TopOne';
import Timebar from '../../../components/common/Time';
import Modaldia from './Modal';
const { Column, ColumnGroup } = Table;
const Option = Select.Option;

class Counter extends React.Component {
    state = {
        filteredInfo: '',
        sortedInfo: '',
        data: this.props.data,
        dataSource: this.props.data2,
        pagination: {},
        loading: false,
        isVisible: false,
        key: 1,
        titleName: 'DMC',
    }
    constructor(props) {
        super(props);
        this.filter = '';
        this.timeoutId = '';
    }
    componentDidMount() {
        // 用事件请求测试数据
        if (!this.props.data || !this.props.data.listData) {
            // 请求列表数据
            this.props.getDMCData();
        }
        /*this.timer = setInterval(function () {
           
        }.bind(this),this.state.time); */
    }

    /*    componentWillUnmount() {
          this.timer && clearTimeout(this.timer);
        }*/
    componentWillReceiveProps(props) {
        if (props.data.length != 0) {
            this.setState({ data: props.data });
            this.setState({ dataSource: props.data2 });
        }
    }
    handleChange = (pagination, filters, sorter) => {
        let _this = this;
        this.setState({
            filters: this.filter,
            pagination: this.pagination,
            sorter: this.sorter,
        });
        this.props.getDMCData({pagination,filters,sorter});
        
    }
    valSearch = (searchContent) => {
        this.filter = searchContent;
        this.handleChange();
    }
    modalCancel = (e) => {
        this.setState({ isVisible: false });
    }
    showModal = () => {
        let newKey = parseInt(100 * Math.random());
        this.setState({ key: newKey });
        this.setState({ isVisible: true });
    }
    onShowSizeChange(current, pageSize){
        //this.props.searchGroupManage({page:current ,size: pageSize});
        console.log(current);    
    }

/*分页事件*/
onChange(current){     
    console.log(current);       
　　　　//this.props.searchGroupManage({page:current,size:this.state.pageSize});
}
    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const pagination = {
            total: 1,/*这里是所有的数据*/
           // showSizeChanger: true,
            onShowSizeChange:this.onShowSizeChange.bind(this),
            onChange:this.onChange.bind(this)
        };
        const columns = [{
            title: '活跃状态',
            width: 80,
            dataIndex: 'activeStatus',
            key: 'activeStatus',
            render: (text, record) => <span title={text} style={{ width: 80 }}>{text}</span>,
            sorter:true,
            filteredValue: filteredInfo.activeStatus || null,
            onFilter: (value, record) => record.activeStatus == value,
        },
        {
            title: 'DMC名称',
            dataIndex: 'dmcName',
            key: 'dmcName',
            filteredValue: filteredInfo.dmcName || null,
            onFilter: (value, record) => record.dmcName.toLowerCase().includes(value.toLowerCase()),
            sorter: true,
        }, {
            title: 'DMS数量',
            dataIndex: 'dmsCnt',
            key: 'dmsCnt',
            render: text => <a href="#">{text}</a>,
            sorter: true,
        }, {
            title: '活跃流数量',
            dataIndex: 'streamCnt',
            key: 'streamCnt',
            render: text => <a href="#">{text}</a>,
            sorter: true,
        }, {
            title: '上行',
            children: [{
                title: '流量',
                width: 90,
                dataIndex: 'upBps',
                key: 'upBps',
                render: text => <span title={text} style={{ width: 90 }}>{text}</span>,
                sorter: true,
            }, {
                title: '区域分布',
                width: 80,
                dataIndex: 'upAreaCnt',
                key: 'upAreaCnt',
                render: (text) => (<span className="c-modle" title={text} style={{ width: 80 }} onClick={this.showModal}>{text}</span>),
                sorter: true,
            }],
        }, {
            title: '下行',
            children: [{
                title: '客户端',
                dataIndex: 'subscriptionCnt',
                key: 'subscriptionCnt',
                render: text => <a href="#">{text}</a>,
                sorter:true,
            }, {
                title: '独立IP',
                dataIndex: 'ipCnt',
                key: 'ipCnt',
                render: text => <a href="#">{text}</a>,
                sorter: true
            }, {
                title: '流量',
                width: 90,
                dataIndex: 'downBps',
                key: 'downBps',
                render: text => <span title={text} style={{ width: 90 }}>{text}</span>,
                sorter: true
            }, {
                title: '区域分布',
                width: 80,
                dataIndex: 'downAreaCnt',
                key: 'downAreaCnt',
                render: (text) => (<span className="c-modle" title={text} style={{ width: 80 }} onClick={this.showModal}>{text}</span>),
                sorter: true
            }, {
                title: '丢包率',
                width: 64,
                dataIndex: 'subscriptionDropRate',
                key: 'subscriptionDropRate',
                render: text => <span title={text} style={{ width: 64 }}>{text}</span>,
                sorter: true
            }],
        }, {
            title: '图形',
            width: 50,
            dataIndex: 'viewStatus',
            key: 'viewStatus',
            render: (text, record) => <span className="c-modle" title={text} style={{ width: 50 }}>{text}</span>,
            sorter: true
        }];
        return (
            <div id="dmc">
                <Topone title={this.state.titleName} />
                <Search valSearch={this.valSearch.bind(this)} />
                <Timebar itemNum={this.state.data.length} />
                <Table columns={columns} rowKey={record => record.dmcTag} dataSource={this.state.data} onChange={this.handleChange} pagination={pagination} />
                <Modaldia newKey={this.state.key} visible={this.state.isVisible} modalSource={this.state.dataSource} del={() => this.modalCancel()} />
            </div>
        );
    }
};
export default Counter;
