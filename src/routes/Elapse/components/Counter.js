import React from 'react';
import {DatePicker,Button,Tabs, Select,Icon} from 'antd';
import Search from './Search';
import Topone from '../../../components/common/TopOne';
import UP from './up_flow';
import DOWN from './down_flow';
import PACKET from './packet';
import CLIENT from './client';
import './elapse.css';
const { RangePicker } = DatePicker;
const Option = Select.Option;
const TabPane = Tabs.TabPane;


class Counter extends React.Component {
    state = {
        titleName:'图形',
        name:'elapse',
        rotate:0
    };
    componentDidMount() {
        if(!this.props.location.search){
            this.props.getElapse();
        }
    }
    componentWillReceiveProps(nextProps){ 
        if (this.props.flowData !== nextProps.flowData) {
            this.setState({flowData:nextProps.flowData});
        }
    }
    changeRotate=(key)=>{
        if(key == '1'){
            this.setState({rotate:0});
        }else{
            this.setState({rotate:20});
        }
    }
    render() {
      const { dmsData ,flowData} = this.props;
      return (
        <div id="elapse">
            <Topone title={this.state.titleName} name={this.state.name} />
            <Search getElapse={this.props.getElapse} changeRotate={this.changeRotate} dmsTag={(this.props.location.query.dmsTag) ? this.props.location.query.dmsTag :''} dmcTag={(this.props.location.query.dmcTag) ? this.props.location.query.dmcTag :''} streamName={(this.props.location.query.streamName) ? this.props.location.query.streamName :''} />
            <div className='parent'>
              <Tabs tabPosition="left">
                  <TabPane tab="上行流量" key="1"><UP flowData = {this.state.flowData} rotate={this.state.rotate} /></TabPane>
                  <TabPane tab="下行流量" key="2"><DOWN flowData = {this.state.flowData} rotate={this.state.rotate} /></TabPane>
                  <TabPane tab="丢包率" key="3"><PACKET flowData = {this.state.flowData}  rotate={this.state.rotate} /></TabPane>
                  <TabPane tab="订阅客户端" key="4"><CLIENT flowData = {this.state.flowData} rotate={this.state.rotate} /></TabPane>
              </Tabs>
            </div>
        </div>
      );
    }
};
export default Counter;