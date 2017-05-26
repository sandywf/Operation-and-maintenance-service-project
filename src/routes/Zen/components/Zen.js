import React from 'react';
import {ReactInterval} from 'react-interval';
import { Table,Menu, Dropdown,Input,Modal,Button,Select } from 'antd';
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
  showModal() {
    this.setState({
      visible: true,
    });
  },
   handleCancel(e) {
    console.log(e);
    this.setState({
      visible: false,
    });
  },
  handleChange(pagination, filters, sorter) {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
     /* sortedInfo: sorter,*/
    });
  },
  onInputChange(e) {
    this.setState({ indIp: e.target.value });
  },
  flowInput(e) {
    this.setState({ flowName: e.target.value });
  },
  handle(value) {
    this.setState({ dmcName: value });
  },
   /*下拉框选择刷新时间*/
  handleMenuClick (e){
    this.setState({ time: parseInt(e.key) });
    this.setState({timeName: e.domEvent.currentTarget.innerHTML});
  },
  onSearch() {
    const { indIp } = this.state;
    const regIp = new RegExp(indIp, 'gi');
    const { flowName } = this.state;
    const regFlow = new RegExp(flowName, 'gi');
    const { dmcName } = this.state;
    const regDmc = new RegExp(dmcName, 'gi');
    this.setState({
      filterDropdownVisible: false,
      data: this.props.data.map((record) => {
        const matchIp = record.cIp.match(regIp);
        const matchFlow = record.cFlow.match(regFlow);
        const matchDmc = record.cDmc.match(regDmc);
    
        if (matchIp && matchFlow && matchDmc) {
        return {
          ...record,
          cDmc: (
            <span>
              {record.cDmc.split(regDmc).map((text, i) => (
                  i > 0 ? [<i>{matchDmc[0]}</i>, text] : text
              ))}
            </span>
          ),
          cFlow: (
            <span>
              {record.cFlow.split(regFlow).map((text, i) => (
                  i > 0 ? [<i>{matchFlow[0]}</i>, text] : text
              ))}
            </span>
          ),
          cIp: (
            <span>
              {record.cIp.split(regIp).map((text, i) => (
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
      title: '客户端',
      dataIndex: 'cClient',
      key: 'cClient',
      sorter: (a, b) => a.cClient.length - b.cClient.length,
/*      sortOrder: sortedInfo.columnKey === 'cClient' && sortedInfo.order,
*/    },
    {
      title: 'DMC名称',
      dataIndex: 'cDmc',
      key: 'cDmc',
      render: text => <a href="#">{text}</a>,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }),
      sorter: (a, b) => a.cDmc.length - b.cDmc.length,
  
    }, {
      title: 'DMS名称',
      dataIndex: 'cDms',
      key: 'cDms',
      render: text => <a href="#">{text}</a>,
      sorter: (a, b) => a.cDms - b.cDms,
/*      sortOrder: sortedInfo.columnKey === 'cDms' && sortedInfo.order,
*/    },{
      title: '流名称',
      dataIndex: 'cFlow',
      key: 'cFlow',
      render: text => <a href="#">{text}</a>,
      sorter: (a, b) => a.cFlow - b.cFlow,
    },{
      title: '独立IP',
      dataIndex: 'cIp',
      key: 'cIp',
      render: text => <a href="#">{text}</a>,
      sorter: (a, b) => a.cIp - b.cIp,
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
        <h4 className="ms-overall">
          <strong>订阅客户端</strong> 
          <i className="iconfont icon-Full-screen"></i> 
          <i>全屏</i>
           <i className="iconfont icon-Export"></i> 
          <i>导出</i>
        </h4>
        <div className="table-search">
           <label>DMC名称：</label>
          <Select defaultValue="" onChange={this.handle}
          filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            <Option value=""></Option>
            <Option value="天津DMC">天津DMC</Option>
          </Select>
          <label>流名称：</label>
           <Input value={this.state.flowName}
            onChange={this.flowInput}
            onPressEnter={this.onSearch} />
            <label>独立IP：</label>
           <Input value={this.state.indIp}
            onChange={this.onInputChange}
            onPressEnter={this.onSearch} />
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
