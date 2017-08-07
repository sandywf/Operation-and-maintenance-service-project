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
        filteredInfo: null,
        sortedInfo: null,
        data: this.props.data,
        dataSource: this.props.data2,
        pagination: {},
        loading: false,
        isVisible: false,
        key: 1,
        titleName: 'DMC',
    };
    constructor(props) {
        super(props);
        this.filter = '';
        this.timeoutId = '';
    }
    componentDidMount() {
        // 用事件请求测试数据
        this.props.getTestData();
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
            filteredInfo: this.filter,
        });
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
    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [{
            title: '活跃状态',
            width: 80,
            dataIndex: 'active',
            key: 'active',
            render: (text, record) => <span title={text} style={{ width: 80 }}>{text}</span>,
            sorter: (a, b) => a.active.length - b.active.length,
            filteredValue: filteredInfo.active || null,
            onFilter: (value, record) => record.active == value,
        },
        {
            title: 'DMC名称',
            dataIndex: 'name',
            key: 'name',
            filteredValue: filteredInfo.name || null,
            onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
            sorter: (a, b) => a.name.length - b.name.length,
        }, {
            title: 'DMS数量',
            dataIndex: 'dmsNum',
            key: 'dmsNum',
            render: text => <a href="#">{text}</a>,
            sorter: (a, b) => a.dmsNum - b.dmsNum,
        }, {
            title: '活跃流数量',
            dataIndex: 'atvnum',
            key: 'atvnum',
            render: text => <a href="#">{text}</a>,
            sorter: (a, b) => a.atvnum - b.atvnum,
        }, {
            title: '上行',
            children: [{
                title: '流量',
                width: 90,
                dataIndex: 'upflow',
                key: 'upflow',
                render: text => <span title={text} style={{ width: 90 }}>{text}</span>,
                sorter: (a, b) => a.upflow - b.upflow,
            }, {
                title: '区域分布',
                width: 80,
                dataIndex: 'uparea',
                key: 'uparea',
                render: (text) => (<span className="c-modle" title={text} style={{ width: 80 }} onClick={this.showModal}>{text}</span>),
                sorter: (a, b) => a.uparea - b.uparea,
            }],
        }, {
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
            }, {
                title: '流量',
                width: 90,
                dataIndex: 'dflow',
                key: 'dflow',
                render: text => <span title={text} style={{ width: 90 }}>{text}</span>,
                sorter: (a, b) => a.dflow - b.dflow,
            }, {
                title: '区域分布',
                width: 80,
                dataIndex: 'darea',
                key: 'darea',
                render: (text) => (<span className="c-modle" title={text} style={{ width: 80 }} onClick={this.showModal}>{text}</span>),
                sorter: (a, b) => a.darea - b.darea,
            }, {
                title: '丢包率',
                width: 64,
                dataIndex: 'packet',
                key: 'packet',
                render: text => <span title={text} style={{ width: 64 }}>{text}</span>,
                sorter: (a, b) => a.packet - b.packet,
            }],
        }, {
            title: '图形',
            width: 50,
            dataIndex: 'graph',
            key: 'graph',
            render: (text, record) => <span className="c-modle" title={text} style={{ width: 50 }}>{text}</span>,
            sorter: (a, b) => a.graph - b.graph,
        }];
        return (
            <div id="dmc">
                <Topone title={this.state.titleName} />
                <Search valSearch={this.valSearch.bind(this)} />
                <Timebar itemNum={this.state.data.length} />
                <Table columns={columns} dataSource={this.state.data} onChange={this.handleChange} />
                <Modaldia newKey={this.state.key} visible={this.state.isVisible} modalSource={this.state.dataSource} del={() => this.modalCancel()} />
            </div>
        );
    }
};
export default Counter;
