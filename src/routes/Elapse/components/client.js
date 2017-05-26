import React from 'react';
import ReactEcharts from 'echarts-for-react';
const Client = React.createClass({
      propTypes: {},
      timeTicket: null,
    getInitialState: function() {
        return {option: this.getOption()};
    },
    fetchNewDate: function() {
        let axisData = (new Date()).toLocaleString().replace(/^\D*/,'');
        let option = this.state.option;
        let data0 = option.series[0].data;
        data0.shift();
        data0.push(Math.round(Math.random() * 1000));
        option.xAxis[0].data.shift();
        option.xAxis[0].data.push(axisData);
        this.setState({option: option});
    },
    componentDidMount: function() {
        if (this.timeTicket) {
            clearInterval(this.timeTicket);
        }
        this.timeTicket = setInterval(this.fetchNewDate, 1000);
    },
    componentWillUnmount: function() {
        if (this.timeTicket) {
            clearInterval(this.timeTicket);
        }
    },
    getOption: function() {
        const option = {
            title: {
                text: '订阅客户端',
               x: "center"
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                x: "left",
               data:[{name:'订阅客户端'}]
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    data: (function (){
                        let now = new Date();
                        let res = [];
                        let len = 50;
                        while (len--) {
                            res.unshift(now.toLocaleString().replace(/^\D*/,''));
                            now = new Date(now - 432000000);
                            /*console.log(res.unshift(month.toString()+"/"+ day.toString()+ " "+hour.toString()+":"+mm.toString()));*/
                        }
                        return res;
                    })()
                }
              
            ],
            yAxis: [
                {
                    type: 'value',
                    scale: true,
                    name: '订阅客户端(N)',
                    min: 0,
                    boundaryGap: [0.2, 0.2]
                }
             
            ],
            series: [
                {
                    name:'订阅客户端',
                    type:'line',
                    itemStyle:{normal : {lineStyle:{color:'#75c822'}}}, 
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return idx * 10;
                    },
                    animationDelayUpdate: function (idx) {
                        return idx * 10;
                    },
                    data:(function (){
                        let res = [];
                        let len = 0;
                        while (len < 50) {
                            res.push((Math.random()*10 + 5).toFixed(1) - 0);
                            len++;
                        }
                        return res;
                    })()
                }
            ]
        };
        return option;
    },
    render: function() {
        return (            
            <ReactEcharts ref='echarts_react' option={this.state.option} style={{height: 300}} />
        );
    }
});


export default Client;