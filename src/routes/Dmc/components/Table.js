import React from 'react';
import {Table,Form} from 'antd';
let  dataSource = [];
const FormItem = Form.Item;
const { Column, ColumnGroup } = Table;
class DmcTable extends React.Component {
    state = {
        filteredInfo: null,
        sortedInfo: null,
        loading: false,
        isVisible: false,
        curPage:1,  /*翻页查询*/
        pageSize:1,  /*分页查询*/
    }
    constructor(props) {
        super(props);
        this.filter = '';
    }
    /*翻页事件*/
onShowSizeChange(current, pageSize){
    this.props.searchGroupManage({curPage:current ,pageSize: pageSize});
}

/*分页事件*/
onChange(current){            
　　　　this.props.searchGroupManage({curPage:current,pageSize:this.state.pageSize});
}
    showModal = () => {
        let newKey = parseInt(100 * Math.random());
        this.setState({ key: newKey });
        this.setState({ isVisible: true });
    }
    handleChange = (pagination, filters, sorter) => {
        this.props.getDMCData({pagination,filters,sorter});
    }
    render(){
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const { dataSource ,onChange } = this.props;
        const pagination = {
            showSizeChanger: true,
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
            <Table  dataSource={dataSource} columns={columns} rowKey={record => record.dmcTag} onChange={this.props.subFilter} pagination={pagination} /> 
        );
    }
};
export default DmcTable;


