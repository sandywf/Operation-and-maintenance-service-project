import React from 'react';
import {ReactInterval} from 'react-interval';
import { Table,Menu, Dropdown,Input,Modal,Button,Select } from 'antd';
import './flow.css';
const { Column, ColumnGroup } = Table;
const Option = Select.Option;

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
  getInitialState() {
    return {
      filterDropdownVisible: false,
      filteredInfo: null,
      sortedInfo: null,
      sDmcname: '',
      sFlowname: '',
      sAsgn:'',
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
  showModal() {
    this.setState({
      visible: true
    });
  },
   handleCancel(e) {
    console.log(e);
    this.setState({
      visible: false
    });
  },
  handleChange(pagination, filters, sorter) {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
   /*   sortedInfo: sorter*/
    });
  },
  onInputChange(e) {
    this.setState({ sFlowname: e.target.value }); 
  },
  handle(name, value) {
    let obj = {};
    obj[name] = value;
    this.setState(obj);
  },
  /*下拉框选择刷新时间*/
  handleMenuClick (e){
    this.setState({ time: parseInt(e.key) });
    this.setState({timeName: e.domEvent.currentTarget.innerHTML});
  },
  onSearch() {
    const { sDmcname } = this.state;
    const { sFlowname } = this.state;
    const { sAsgn } = this.state;
    const regDmcname = new RegExp("^"+sDmcname);
    const regFlow = new RegExp("^"+sFlowname);
    const regAsgn = new RegExp(sAsgn, 'gi');

    this.setState({
      filterDropdownVisible: false,
      data:  this.props.data.map((record) => {
        const matchDmc = record.name.match(regDmcname);
        const matchFlow = record.flowName.match(regFlow);
        const matchAsgn = record.synchro.match(regAsgn);
        if (matchDmc && matchFlow && matchAsgn) {
        return {
          ...record,
          name: (
            <span>
              {record.name.split(regDmcname).map((text, i) => (
                  i > 0 ? [<i>{matchDmc[0]}</i>, text] : text
              ))}
            </span>
          ),
          flowName: (
            <span>
              {record.flowName.split(regFlow).map((text, i) => (
                  i > 0 ? [<i>{matchFlow[0]}</i>, text] : text
              ))}
            </span>
          ),
          synchro: (
            <span>
              {record.synchro.split(regAsgn).map((text, i) => (
                  i > 0 ? [<i>{matchAsgn[0]}</i>, text] : text
              ))}
            </span>
          )
        };
        }
      }).filter(record => !!record),
    });
   },
  render() {
    let { filteredInfo } = this.state;
   /* sortedInfo = sortedInfo || {};*/
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
      title: '流名称',
      dataIndex: 'flowName',
      key: 'flowName',
      sorter: (a, b) => a.flowName.length - b.flowName.length,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }),
    },
    {
      title: 'DMC名称',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="#">{text}</a>,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }),
      sorter: (a, b) => a.name.length - b.name.length,
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
      sorter: (a, b) => a.synchro - b.synchro,
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
        <h4 className="ms-overall">
          <strong>活跃流</strong> 
          <i className="iconfont icon-Full-screen"></i> 
          <i>全屏</i>
           <i className="iconfont icon-Export"></i> 
          <i>导出</i>
        </h4>
        <div className="table-search">
        	<label>DMC名称：</label>
          <Select defaultValue="" onChange={this.handle.bind(this,'sDmcname')}
          filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            <Option value=""></Option>
            <Option value="天津DMC">天津DMC</Option>
          </Select>
          <label>流名称：</label>
       		 <Input value={this.state.sFlowname} onChange={this.onInputChange} />
            <label>是否同步流：</label>
       		  <Select defaultValue="" onChange={this.handle.bind(this,'sAsgn')}
    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
              <Option value=""></Option>
              <Option value="同步">同步</Option>
              <Option value="上传">上传</Option>
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
        <Modal title="区域分布" visible={this.state.visible} onCancel={this.handleCancel} footer={null}>
          <Table dataSource={this.state.dataSource} columns={diacolumns} />
        </Modal>
      </div>);
  },
});
export default Counter;
