import React from 'react';
import ReactEcharts from 'echarts-for-react';
class Client extends React.Component {
    constructor(props) {
        super(props);
    
    }
    getOption(){  
        const xData = this.props.flowData ? this.props.flowData.subscriptionCountXList : [];
        const yData = this.props.flowData ? this.props.flowData.subscriptionCountYList : [];
        const yName = this.props.flowData && this.props.flowData.subscriptionCountYUnit;
        const option = {
            title: {
                text: '订阅客户端',
                x: "center"
            },
            legend: {
                x: "left",
                data:[{name:'订阅客户端'}]
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
                data: xData,
                axisLabel :{rotate:25,interval:0}  
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
                name:'订阅客户端',
                type:'line',
                itemStyle:{normal : {lineStyle:{color:'#75c822'}}}, 
                smooth: true,
                data:yData
              }
            ]
        };
        return option;
    }
    render() {
        return (            
            <ReactEcharts ref='echarts_react' option={this.getOption()} style={{height: 300}} />
        );
    }
};
export default Client;