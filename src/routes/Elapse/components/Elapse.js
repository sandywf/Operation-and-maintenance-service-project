import React from 'react';
import {DatePicker,Button,Tabs, Select,Icon} from 'antd';

import UP from './up_flow';
import DOWN from './down_flow';
import PACKET from './packet';
import CLIENT from './client';
import './elapse.css';
const { RangePicker } = DatePicker;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const zoom = [{
    key:'1',
    name: '50m',
    data: '50m',
  },{
    key:'2',
    name: '30m',
    data: '30m',
  },{
    key:'3',
    name: '1h',
    data: '1h',
  },{
    key:'4',
    name: '1d',
    data: '1d',
  },{
    key:'5',
    name: '所有',
    data: '所有',
}];
function onChange(date, dateString) {
  console.log(date, dateString);
}
const Charts= React.createClass({
    getInitialState() {
      return {
        show:false
      }
    },
  dmcHandle(value){
      if(value!==''){
        this.setState({show:true})
      }else{
        this.setState({show:false})
      }
    },
    changeTime(key) { 
      this.setState({active: key});
    },
    render: function() {
      return (
        <div className='elapse'>
            <h4 className="ms-overall">
              <strong>图形</strong> 
              <i className="iconfont icon-Full-screen"></i> 
              <i>全屏</i>
            </h4>
          <div className="table-search">
            <div className="s-item">
              <lable>DMC名称：</lable>
              <Select onChange={this.dmcHandle}>
                <Option value="">请选择</Option>
                <Option value="活跃">活跃</Option>
                <Option value="不活跃">不活跃</Option>
              </Select>
              <Select onChange={this.dmsHandle} className={this.state.show ? 'showDms' : 'noneDms'}>
                <Option value="">请选择</Option>
                <Option value="活跃">活跃</Option>
                <Option value="不活跃">不活跃</Option>
              </Select>
            </div>
            <div className="s-item">
              <lable>缩放：</lable>
              <div className="zoom">
                {zoom.map((item,index)=>{
                  return <span key={index} data={item.data} onClick={()=>this.changeTime(item.key)} 
                  className={this.state.active === item.key ? "active":""}>{item.name}</span>
                })}
              </div>
            </div>
            <div className="s-item">
              <lable>时间段：</lable>
              <div><RangePicker onChange={onChange} /></div>
            </div>
          </div>
            <div className='parent'>
              <Tabs tabPosition="left">
                  <TabPane tab="上行流量" key="1"><UP /></TabPane>
                  <TabPane tab="下行流量" key="2"><DOWN /></TabPane>
                  <TabPane tab="丢包率" key="3"><PACKET /></TabPane>
                  <TabPane tab="订阅客户端" key="4"><CLIENT /></TabPane>
              </Tabs>
            </div>
        </div>
      );
    }
});
export default Charts;