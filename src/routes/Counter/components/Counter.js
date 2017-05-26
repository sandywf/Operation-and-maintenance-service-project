import React from 'react';
import {ReactInterval} from 'react-interval';
import { Table,Menu, Dropdown,Input,Modal,Button,Select } from 'antd';
const { Column, ColumnGroup } = Table;
const Option = Select.Option;
/*弹出窗列表*/
const diacolumns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
}];

const Counter = React.createClass({
  /*初始值设置*/
  getInitialState() {
    return {
      filterDropdownVisible: false,
      filteredInfo: null,
      sortedInfo: null,
      indIp: '',
      flowName: '',
      dmcName: '',
      time:20000,
      timeName:'2秒',
      data:this.props.data,
      dataSource:this.props.data2,
    };
  },
  /*真实的DOM被渲染出来后调用*/
  componentDidMount(){
    this.props.getMENUData();
    if(!this.props.data || !this.props.data.listData){
      this.props.getKHData();
    }
  },
  /*组件接收到新的props时调用*/
  componentWillReceiveProps(props){ 
   console.log("componentWillReceiveProps", props);
    if(props.data.length != 0){
      this.setState({data:props.data});
      this.setState({dataSource:props.data2});
    }
  },
  /*显示弹窗*/
  showModal() {
    this.setState({
      visible: true,
    });
  },
  /*弹窗中关闭弹窗事件*/
  handleCancel(e) {
    this.setState({
      visible: false,
    });
  },
  /*表单查询事件*/
  handleChange(pagination, filters, sorter) {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
    /*  sortedInfo: sorter,*/
    });
  },
  /*获取input值*/
  onInputChange(e) {
    this.setState({ indIp: e.target.value });
  },
  /*获取input值*/
  flowInput(e) {
    this.setState({ flowName: e.target.value });
  },
  /*获取input值*/
  handle(value) {
    this.setState({ dmcName: value });
  },
  /*下拉框选择刷新时间*/
  handleMenuClick (e){
    this.setState({ time: parseInt(e.key) });
    this.setState({timeName: e.domEvent.currentTarget.innerHTML});
  },
  /*查询事件*/
  onSearch() {
    const { indIp } = this.state;
    const regIp = new RegExp(indIp, 'gi');
    const { dmcName } = this.state;
    const regDmc = new RegExp(dmcName, 'gi');
    this.setState({
      filterDropdownVisible: false,
      data: this.props.data.map((record) => {
        const matchIp = record.indIp.match(regIp);
        const matchDmc = record.indDmc.match(regDmc);
      /*正则match*/
        if (matchIp && matchDmc) {
          return {
            ...record,
            cDmc: (
              <span>
                {record.indDmc.split(regDmc).map((text, i) => (
                    i > 0 ? [<i>{matchDmc[0]}</i>, text] : text
                ))}
              </span>
            ),
            cIp: (
              <span>
                {record.indIp.split(regIp).map((text, i) => (
                    i > 0 ? [<i>{matchIp[0]}</i>, text] : text
                ))}
              </span>
            )
          };
        }
      }).filter(record => !!record),
    });
   },
  render() {
    let { sortedInfo, filteredInfo } = this.state;
 /*   sortedInfo = sortedInfo || {};*/
    filteredInfo = filteredInfo || {};
    /*下拉框*/
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key={10000}>10秒</Menu.Item>
        <Menu.Item key={30000}>30秒</Menu.Item>
        <Menu.Item key={60000}>1分钟</Menu.Item>
      </Menu>
    );
    /*table列*/
    const columns = [{
      title: '独立IP',
      dataIndex: 'indIp',
      key: 'indIp',
      sorter: (a, b) => a.indIp.length - b.indIp.length,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }),
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
      sorter: (a, b) => a.indDmc - b.indDmc,
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
        {/*头部*/}
        <h4 className="ms-overall">
          <strong>独立IP</strong> 
          <i className="iconfont icon-Full-screen"></i> 
          <i>全屏</i>
           <i className="iconfont icon-Export"></i> 
          <i>导出</i>
        </h4>
        {/*搜索*/}
        <div className="table-search">
          <label>独立IP：</label>
          <Input value={this.state.indIp} onChange={this.onInputChange} onPressEnter={this.onSearch} />
       		<label>DMC名称：</label>
          <Select defaultValue="" onChange={this.handle}
          filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            <Option value=""></Option>
            <Option value="天津DMC">天津DMC</Option>
          </Select>
          <Button type="primary" onClick={this.onSearch}>查询</Button>
        </div>
        {/*表单上头部*/}
        <div className="t-num">总共<span className="c-blue">{this.state.data.length}</span>条数据
          <div className="fr">已更新：16:54:59
           <Dropdown overlay={menu}>
              <i className="iconfont icon-Refresh ant-dropdown-link"></i>
            </Dropdown>{this.state.timeName}
          </div>
        </div>
        {/*时间器组件*/}
        <ReactInterval  
          timeout={this.state.time}
          enabled={true}
          callback={()=>this.props.getKHData()}
        />
        {/*表单*/}
        <Table columns={columns} dataSource={this.state.data} onChange={this.handleChange} />
        {/*弹出窗*/}
        <Modal title="区域分布" visible={this.state.visible}
          onCancel={this.handleCancel} footer={null}>
          <Table dataSource={this.state.dataSource} columns={diacolumns} />
        </Modal>
      </div>
    );
  },
});
export default Counter;
