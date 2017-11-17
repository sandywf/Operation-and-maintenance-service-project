import React from 'react';
import ReactEcharts from 'echarts-for-react';

import {Icon,Menu, Dropdown} from 'antd';
import moment from 'moment';
import ZoomTime from '../../../components/common/ZoomTime';

var timeTxt='5分钟';
class Charts extends React.Component {
    state = {
    }
    constructor(props) {
      super(props);
    }
    getOption(){  
      const xData = this.props.flowData ? this.props.flowData.publishBpsXList : [];
      const yData = this.props.flowData ? this.props.flowData.publishBpsYList : [];
      const yName = this.props.flowData && this.props.flowData.publishBpsYUnit;
        const option = {
            title : {
              text: '全局上行流量',
              x: 'center',
              textStyle:{
                color:'#666',
                fontWeight:'normal',
        　　　　 fontSize:14
              },
              subtext:'['+timeTxt+']',
              subtextStyle:{
                color:'#8ba7ca',
                fontWeight:'bold',
        　　　　 fontSize:12,
              },
            },
            tooltip: {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: "{b}<br/>{a}:{c}"
            },
            grid:{
              x:60,
              x2:80,
            }, 
            xAxis: [
              {
                type: "category",
                splitLine: {show: false},
                data: xData,
                //axisLabel :{rotate:25,interval:0}  
              }
            ],
            yAxis: [
              {
                type: 'value',
                scale: true,
                name: yName,
                min: 0,
                boundaryGap: [0.2, 0.2]
              }
            ],
            series: [
              {
                name:'流量',
                type:'line',
                itemStyle:{normal : {lineStyle:{color:'#4ab6b6'}}}, 
                smooth: true,
                data:yData
              }
            ]
        };
        return option;
    }
    handleMenuClick (e){
      timeTxt = e.domEvent.currentTarget.innerHTML;
      let filtersField = {},filter={dotNum:13,xAxisTimeFormat:'HH:mm'},eTime={endTime:moment().format('x')};
      switch(parseInt(e.key))
      {
        case 2:
          filtersField = {timeNum:1,timeUnit:'HOUR'}
          break;
        case 3:
          filtersField = {timeNum:1,timeUnit:'DAY'}
          break;
        default:
          filtersField = {timeNum:5,timeUnit:'MINUTE'}
      }
      const params = Object.assign({},filtersField,filter,eTime);
      this.props.getFlow(params);
    }
    render() {  
      return (
        <div className='elapse'>
           <div className="e-flow"><ReactEcharts ref='echarts_react' option={this.getOption()} style={{height:260,width:1000}} /></div>
          <div className="set-flow"><ZoomTime handleMenuClick={this.handleMenuClick.bind(this)} getFlow = {this.props.getFlow} /></div>
        </div>
      );
    }
};
export default Charts;