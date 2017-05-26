import React from 'react';
import ReactEcharts from 'echarts-for-react';
import {Button,Select ,Icon,Menu, Dropdown} from 'antd';

const Option = Select.Option;
function onChange(date, dateString) {
  console.log(date, dateString);
}
const Charts= React.createClass({
    getInitialState: function() {
      return {
        option: this.getOption(),
        time:20000,
        timeName:'2秒'
      };
    },
    getOption: function() {  
        const option = {
            title : {
              text: '全局上行流量',
              x: 'center'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: "{b}<br/>{a}:{c}"
            },
           
            xAxis: [
              {
                type: "category",
                name: "x",
                splitLine: {show: false},
                data: ["13:00", "15:00", "17:00", "19:00", "21:00", "23:00", "1:00", "3:00", "5:00"]
              }
            ],
            yAxis: [
              {
                type: "log",
                name: "流量(kb/s)"
              }
            ],
            series: [
              {
                name:'流量',
                type:'line',
                itemStyle:{normal : {lineStyle:{color:'#4ab6b6'}}}, 
                smooth: true,
                data:[134,3900,2767,5545,32233,3900,2767,5545,32233]
              }
            ]
        };
        return option;
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
        <div className='elapse'>
          <div className="fresh fr">
            <Dropdown overlay={menu}>
              <div className="freshTime"> <i className="iconfont icon-allocation"></i>设置</div>
            </Dropdown>
          </div>
          <ReactEcharts ref='echarts_react' option={this.state.option} style={{height:270,width:860}} />
        </div>
      );
    }
});
export default Charts;