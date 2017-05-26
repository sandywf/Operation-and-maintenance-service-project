import React from 'react';
import {ReactInterval} from 'react-interval';
import { Table,Menu, Dropdown,Input,Modal,Button,Select } from 'antd';
const { Column, ColumnGroup } = Table;
const Option = Select.Option;

/*弹窗中表格对应的列名*/
const diacolumns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
}];

/*页面事件部分 start*/
const Dms = React.createClass({
  getInitialState() {
    return {
      filterDropdownVisible: false,
      filteredInfo: null,
      sDmc: '',
      sDms: '',
      sServer: '',
      sActive: '',
      sOnline: '',
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
    });
  },
  onInputChange(e) {
    this.setState({ sDms: e.target.value });
  },
  handle(name, value) {
    let obj = {};
    obj[name] = value;
    this.setState(obj);
    console.log(obj);
  },
  /*下拉框选择刷新时间*/
  handleMenuClick (e){
    this.setState({time: parseInt(e.key) });
    this.setState({timeName: e.domEvent.currentTarget.innerHTML});
  },
  onSearch() {
    const { sDmc } = this.state;
    const { sDms } = this.state;
    const { sServer } = this.state;
    const { sActive } = this.state;
    const { sOnline } = this.state;
    const regDmc = new RegExp(sDmc);
    const regDms = new RegExp(sDms);
    const regServer = new RegExp("^"+sServer);
    const regActive = new RegExp("^"+sActive);
    const regOnline = new RegExp("^"+sOnline);

    this.setState({
      filterDropdownVisible: false,
      data: this.props.data.map((record) => {
        const matchDmc = record.name.match(regDmc);
        const matchDms = record.dmsname.match(regDms);
        const matchSrv = record.server.match(regServer);
        const matchAtv = record.active.match(regActive);
        const matchOnline = record.online.match(regOnline);
        if (matchDmc && matchDms && matchSrv && matchAtv && matchOnline) {
          return {
            ...record,
            name: (
              <span>
                {record.name.split(regDmc).map((text, i) => (
                  i > 0 ? [<i>{matchDmc[0]}</i>, text] : text
                ))}
              </span>
            ),
            dmsname: (
              <span>
                {record.dmsname.split(regDms).map((text, i) => (
                  i > 0 ? [<i>{matchDms[0]}</i>, text] : text
                ))}
              </span>
            ),
            server: (
              <span>
                {record.server.split(regServer).map((text, i) => (
                  i > 0 ? [<i>{matchSrv[0]}</i>, text] : text
                ))}
              </span>
            ),
             active: (
              <span>
                {record.active.split(regActive).map((text, i) => (
                  i > 0 ? [<i>{matchAtv[0]}</i>, text] : text
                ))}
              </span>
            ),
             online: (
              <span>
                {record.online.split(regOnline).map((text, i) => (
                  i > 0 ? [<i>{matchOnline[0]}</i>, text] : text
                ))}
              </span>
            )
          };
        }
      }).filter(record => !!record),
    });
   },
   /*页面事件部分 end*/
  render() {
    let { filteredInfo } = this.state;
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
      title: '活跃状态',
      width: 80,
      dataIndex: 'active',
      key: 'active',
      sorter: (a, b) => a.active.length - b.active.length,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }),
    },{
      title: '在线状态',
      width: 80,
      dataIndex: 'online',
      key: 'online',
      sorter: (a, b) => a.online.length - b.online.length,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }),
    },
     {
      title: 'DMS名称',
      dataIndex: 'dmsname',
      key: 'dmsname',
      sorter: (a, b) => a.dmsname - b.dmsname,
    },{
      title: 'DMC名称',
      dataIndex: 'name',
      key: 'name',
      render: text => <span title={text}>{text}</span>,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }),
      sorter: (a, b) => a.name.length - b.name.length,
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
      sorter: (a, b) => a.server - b.server,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }),
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
      <div id="dmc">
        <h4 className="ms-overall">
          <strong>DMS</strong> 
          <i className="iconfont icon-Full-screen"></i> 
          <i>全屏</i>
           <i className="iconfont icon-Export"></i> 
          <i>导出</i>
        </h4>
        <div className="table-search">
          <label>DMC名称：</label>
          <Select defaultValue="" onChange={this.handle.bind(this,'sDmc')}
          filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            <Option value=""></Option>
            <Option value="天津DMC">天津DMC</Option>
          </Select>
          <label>DMS名称：</label>
          <Input  value={this.state.sDms} onChange={this.onInputChange} onPressEnter={this.onSearch} />
          <label>服务器类型：</label>
          <Select defaultValue="" onChange={this.handle.bind(this,'sServer')} filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            <Option value=""></Option>
            <Option value="互动">互动</Option>
            <Option value="观摩">观摩</Option>
            <Option value="互动观摩">互动观摩</Option>
          </Select>
          <label>活跃状态：</label>
          <Select defaultValue="" onChange={this.handle.bind(this,'sActive')} filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            <Option value=""></Option>
            <Option value="活跃">活跃</Option>
            <Option value="不活跃">不活跃</Option>
          </Select>
          <label>在线状态：</label>
          <Select defaultValue="" onChange={this.handle.bind(this,'sOnline')} filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            <Option value=""></Option>
            <Option value="在线">在线</Option>
            <Option value="不在线">不在线</Option>
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
    </div>
    );
  },
});
export default Dms;
