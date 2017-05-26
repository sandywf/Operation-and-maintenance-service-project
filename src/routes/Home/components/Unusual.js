import React from 'react';
import { Table, Icon, Popconfirm,Select,Menu, Dropdown } from 'antd';//表格
const { Column, ColumnGrounp } = Table;
const data = [{
	key:'1',
	DMSName:'DMS名称',
	DMCName:'DMC名称',
	ErrorNum:'2212'
},{
	key:'2',
	DMSName:'DMS名称',
	DMCName:'DMC名称',
	ErrorNum:'3333'
},{
	key:'3',
	DMSName:'DMS名称',
	DMCName:'DMC名称',
	ErrorNum:'3333'
},{
	key:'4',
	DMSName:'DMS名称',
	DMCName:'DMC名称',
	ErrorNum:'3333'
},{
	key:'5',
	DMSName:'DMS名称',
	DMCName:'DMC名称',
	ErrorNum:'3333'
}]
const Unusual = React.createClass({
	 getInitialState: function() {
      return {
        time:20000,
        timeName:'2秒'
      };
    },
    handleMenuClick (e){
    	this.setState({ time: parseInt(e.key) });
    	this.setState({timeName: e.domEvent.currentTarget.innerHTML});
  	},
 	render: function() { 
 		const menu = (
          <Menu onClick={this.handleMenuClick}>
            <Menu.Item key={10000}>10秒</Menu.Item>
            <Menu.Item key={30000}>30秒</Menu.Item>
            <Menu.Item key={60000}>1分钟</Menu.Item>
          </Menu>
    	);
  	return (
  		<div className="ms-abnormal fl linear">
  			<p className="ms-status">
				<i className="iconfont icon-DMS-Abnormal-condition"></i>
				<span>DMS异常状态</span>
				<span className="fr">
					<em>刷新时间：</em>
					<time>2017-00-00 00:00</time>
					<strong>{this.state.timeName}</strong>
				 <Dropdown overlay={menu}>
					<i className="iconfont icon-Refresh"></i>
            	</Dropdown>
				</span>
			</p>
			<Table className="ms-data-table" dataSource={data}>
				<Column title="DMS名称" key="DMSName" dataIndex=""
					render = {(text,record) =>(
						<span>
							<a href="">{record.DMSName}</a>
						</span>
					)}/>
				<Column title="DMC名称" key="DMCName" dataIndex=""
					render = {(text,record) =>(
						<span>
							<a href="">{record.DMCName}</a>
						</span>
					)}/>
				<Column title="错误数量" key="ErrorNum" dataIndex=""
					render = {(text,record) =>(
						<span>
							{record.ErrorNum}
						</span>
					)}/>
			</Table>
		</div>
       );
    }
});
export default Unusual;
