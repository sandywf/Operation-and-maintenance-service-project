import React from 'react';
import {ReactInterval} from 'react-interval';
import { Table,Menu, Dropdown,Input,Modal,Button,Select } from 'antd';

const { Column, ColumnGroup } = Table;
const Option = Select.Option;

const diacolumns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
},{
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
      searchText: '',
      searchText2: '',
      time:20000,
      timeName:'2秒',
      data:this.props.data,
      dataSource:this.props.data2,
    };
  },
  componentDidMount(){
    // 用事件请求测试数据
/*    console.log(this.props.getTime().then(response=>{console.log(response)})
  );*/
    this.props.getTestData();
    if(!this.props.data || !this.props.data.listData){
      // 请求列表数据
      this.props.getDMCData();
    }
  },
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
    this.setState({
      visible: false,
    });
  },
  handleChange(pagination, filters, sorter) {
    /*console.log('Various parameters', pagination, filters);*/
    console.log(sorter);
    this.setState({
      filteredInfo: filters,
      /*sortedInfo: sorter,*/
    }); 
  },
  onInputChange(e) {
    this.setState({ searchText: e.target.value }); 
  },
  handle(value) {
    this.setState({ searchText2: value });
  },
  handleMenuClick (e){
    this.setState({ time: parseInt(e.key) });
    this.setState({timeName: e.domEvent.currentTarget.innerHTML});
  },
   onSearch() {
    const { searchText } = this.state;
    const reg = new RegExp(searchText, 'gi');
    const { searchText2 } = this.state;
    const reg2 = new RegExp("^"+searchText2);
    this.setState({
      filterDropdownVisible: false,
      data: this.props.data.map((record) => {
        const match = record.name.match(reg);
        const match2 = record.active.match(reg2);
        if (match && match2 ) {
          return {
            ...record,
            name: (
              <span>
                {record.name.split(reg).map((text, i) => (
                  i > 0 ? [<i>{match[0]}</i>, text] : text
                ))}
              </span>
            ),
            active: (
              <span>
                {record.active.split(reg2).map((text, i) => (
                  i > 0 ? [<i>{match2 && match2[0]}</i>, text] : text
                ))}
              </span>
            )
          };
        }
      }).filter(record => !!record),
    });
   }, 
  render() {
    let {sortedInfo, filteredInfo} = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        
        const menu = (
          <Menu onClick={this.handleMenuClick}>
            <Menu.Item key={10000}>10秒</Menu.Item>
            <Menu.Item key={30000}>30秒</Menu.Item>
            <Menu.Item key={60000}>1分钟</Menu.Item>
          </Menu>
        );
    const columns = [{
      title: '活跃状态',
      width:80,
      dataIndex: 'active',
      key: 'active',
      render: (text,record) => <span title={text} style={{width:80}}>{text}</span>,
      sorter: (a, b) => a.active.length - b.active.length,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible })
    },
    {
      title: 'DMC名称',
      dataIndex: 'name',
      key: 'name',
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }),
      sorter: (a, b) => a.name.length - b.name.length,
    },{
      title: 'DMS数量',
      dataIndex: 'dmsNum',
      key: 'dmsNum',
      render: text => <a href="#">{text}</a>,
      sorter: (a, b) => a.dmsNum - b.dmsNum,
    },{
      title: '活跃流数量',
      dataIndex: 'atvnum',
      key: 'atvnum',
      render: text => <a href="#">{text}</a>,
      sorter: (a, b) => a.atvnum - b.atvnum, 
    },{
      title: '上行',
        children: [{
          title: '流量',
          width:90,
          dataIndex: 'upflow',
          key: 'upflow',
          render: text => <span title={text} style={{width:90}}>{text}</span>,
          sorter: (a, b) => a.upflow - b.upflow,
        },{
          title: '区域分布',
          width:80,
          dataIndex: 'uparea',
          key: 'uparea',
          render:(text)=>(<span className="c-modle" title={text} style={{width:80}} onClick={this.showModal}>{text}</span>),
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
        },{
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
            render: text => <span title={text} style={{width:90}}>{text}</span>,
            sorter: (a, b) => a.dflow - b.dflow,    
        },{
            title: '区域分布',
            width:80,
            dataIndex: 'darea',
            key: 'darea',
            render:(text)=>(<span className="c-modle" title={text} style={{width:80}} onClick={this.showModal}>{text}</span>),
            sorter: (a, b) => a.darea - b.darea,  
        },{
            title: '丢包率',
            width:64,
            dataIndex: 'packet',
            key: 'packet',
            render: text => <span title={text} style={{width:64}}>{text}</span>,
            sorter: (a, b) => a.packet - b.packet,
          }],
        },{
          title: '图形',
          width:50,
          dataIndex: 'graph',
          key: 'graph',
          render: (text,record) => <span className="c-modle" title={text} style={{width:50}}>{text}</span>,
          sorter: (a, b) => a.graph - b.graph,   
      }];
    return(
      <div id="dmc">
        <h4 className="ms-overall">
          <strong>DMC</strong> 
          <i className="iconfont icon-Full-screen"></i> 
          <i>全屏</i>
           <i className="iconfont icon-Export"></i> 
          <i>导出</i>
        </h4>
        <div className="table-search">
          <lable>DMC名称：</lable>
          <Input  value={this.state.searchText} onChange={this.onInputChange} onPressEnter={this.onSearch} />
          <lable>活跃状态：</lable>
          <Select defaultValue="" onChange={this.handle}
            filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            <Option value=""></Option>
            <Option value="活跃">活跃</Option>
            <Option value="不活跃">不活跃</Option>
          </Select>
         <Button type="primary" onClick={this.onSearch}>查询</Button>
        </div>
        <div className="t-num">总共<span className="c-blue">{this.state.data.length}</span>条数据
        <div className="menuRight fr">已更新：16:54:59
          <Dropdown overlay={menu}>
            <i className="iconfont icon-Refresh ant-dropdown-link"></i>
          </Dropdown>{this.state.timeName}</div>
        </div>  
        <ReactInterval  
          timeout={this.state.time}
          enabled={true}
          callback={()=>this.props.getDMCData()}
        />
         {/*console.log("object  timer",new Date())*/}
        <Table columns={columns} dataSource={this.state.data} onChange={this.handleChange} />
        <Modal title="区域分布" visible={this.state.visible}
          onCancel={this.handleCancel} footer={null}>
            <Table dataSource={this.state.dataSource} columns={diacolumns} />
        </Modal>
      </div>);
    },
});
export default Counter;
