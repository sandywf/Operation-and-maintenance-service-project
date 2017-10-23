import React from 'react';
import ReactDOM from 'react-dom';
import moment from "moment";
import "moment/locale/zh-cn";

moment.locale("zh-cn");
import {DatePicker,Button, Row, Col,Tabs, Select,Icon,Form,Input,Modal} from 'antd';
import DmsName from '../../../components/common/DmsName';
const FormItem = Form.Item;
const Option = Select.Option;
const zoom = [{
    key:'1',
    name: '5m',
    data: '5m',
    valueKey:{timeNum:5,timeUnit:'MINUTE'}
  },{
    key:'2',
    name: '30m',
    data: '30m',
    valueKey:{timeNum:30,timeUnit:'MINUTE'}
  },{
    key:'3',
    name: '1h',
    data: '1h',
    valueKey:{timeNum:1,timeUnit:'HOUR'}
  },{
    key:'4',
    name: '12h',
    data: '12h',
    valueKey:{timeNum:12,timeUnit:'HOUR'}
  },{
    key:'5',
    name: '1d',
    data: '1d',
    valueKey:{timeNum:1,timeUnit:'DAY'}
  },{
    key:'6',
    name: '7d',
    data: '7d',
    valueKey:{timeNum:7,timeUnit:'DAY'}
  },{
    key:'7',
    name: '1m',
    data: '1m',
    valueKey:{timeNum:1,timeUnit:'MONTH'}
  },{
    key:'0',
    name: '所有',
    data: '所有',
    valueKey:{timeUnit:'WHOLE'}
  }];
 const formItemLayout = {
      labelCol: {
        xs: { span: 2 },
        sm: { span: 1.5 },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 8 },
      },
    };
    const nameLayout = {
        labelCol: {
          xs: { span: 8 },
          sm: { span: 8},
        },
        wrapperCol: {
          xs: { span: 14 },
          sm: { span: 14 },
        },
      };
const disabledDate = function (current) {
    return current && current.toDate().getTime() > Date.now();
};
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active:1,
            zoomValue:{timeNum:5,timeUnit:'MINUTE'},
            startValue: moment(moment().add(-5,'minute'), 'YYYY-MM-DD HH:mm:ss'),
            endValue: moment(moment(), 'YYYY-MM-DD HH:mm:ss'),
            endOpen: false,
            dataAbled :false,
            streamName:(this.props.streamName ? this.props.streamName : ''),
            dmcOption: (this.props.dmcTag ? this.props.dmcTag : ''),
            dmsOption:(this.props.dmsTag ? this.props.dmsTag : ''),
            rightBtn:false
        };
    }
    componentDidMount(){
        this.search();
    }
    search =()=>{
        if(this.props.dmcTag || this.props.dmsTag || this.props.streamName){
            this.searchParms();
        }
    }
    dmcGet=(value)=>{
        this.setState({dmcOption:value});
        this.dmcparams = {dmcTag:value};
        this.searchParms();
    }
    dmsGet=(value)=>{
        this.setState({dmsOption:value});
        this.dmsparams = {dmsTag:value};
        this.searchParms();
    }
    searchParms(){
        let _this = this,endTime = moment(moment(), 'YYYY-MM-DD HH:mm:ss'),zoomValue=this.state.zoomValue,dmcParams={},streamParams={};
        if(_this.lineTime ){
            endTime=_this.lineTime;
        }
        const zoomTime = {endTime:moment(endTime).format('x')};
        const secParams = {dotNum: 13,xAxisTimeFormat:'YYYY-MM-dd HH:mm'};
        if(_this.zmVal){
            zoomValue = _this.zmVal;
        }
        if(_this.dmcparams){
            Object.assign(dmcParams, _this.dmcparams);
        }else{
            Object.assign(dmcParams, {dmcTag:this.props.dmcTag});
        }
        if(_this.dmsparams){
            Object.assign(dmcParams, _this.dmsparams);
        }else{
            Object.assign(dmcParams, {dmsTag:this.props.dmsTag});
        }
        streamParams={streamName:this.state.streamName}
        const params = Object.assign({},streamParams,dmcParams,zoomValue, zoomTime,secParams);
        this.props.getElapse(params);
    }
    // disabledStartDate = (startValue) => {
    //     const endValue = this.state.endValue;
    //     if (!startValue || !endValue) {
    //       return false;
    //     }
    //     return startValue.valueOf() > endValue.valueOf();
    //   }
    
    //   disabledEndDate = (endValue) => {
    //     const startValue = this.state.startValue;
    //     if (!endValue || !startValue) {
    //       return false;
    //     }
    //     return endValue.valueOf() > startValue.valueOf();
    //   }  
      onStartChange = (value) => {
       this.setState({startValue:value});
        const keyValue = this.state.zoomValue;
        if(value){
            var formatTime = moment(moment(value).add(keyValue.timeNum,keyValue.timeUnit).format('YYYY-MM-DD HH:mm:ss'));
            this.setState({endValue:formatTime});
            this.lineTime = formatTime;
            this.searchParms();
        }
      }
    
      onEndChange = (value) => {
        this.lineTime = value;
        this.setState({endValue:value});
        const keyValue = this.state.zoomValue;
        if(value){
            var formatTime = moment(moment(value).add(-(keyValue.timeNum),keyValue.timeUnit).format('YYYY-MM-DD HH:mm:ss'));
            this.setState({startValue:formatTime});
            this.searchParms();
        } 
      }
    
      handleStartOpenChange = (open) => {
        if (!open) {
          this.setState({ endOpen: true });
        }
      }
    
      handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
      }
    changeTime(key,keyValue) { 
        this.setState({active: key});
        this.setState({zoomValue: keyValue});
        if(key !== '0'){
            this.setState({dataAbled:false});
            const end = this.state.endValue,start=this.state.startValue;
            if(!end && !start){
                Modal.error({content:'请选择时间段！'});
                return false;
            }
            if(end === null){
                var formatTime = moment(moment(start).add((keyValue.timeNum),keyValue.timeUnit).format('YYYY-MM-DD HH:mm:ss'));
                this.setState({endValue:formatTime});
            }else if(start === null){
                var formatTime = moment(moment(end).add(-(keyValue.timeNum),keyValue.timeUnit).format('YYYY-MM-DD HH:mm:ss'));
                this.setState({startValue:formatTime});
            }else{
                var formatTime = moment(moment(end).add(-(keyValue.timeNum),keyValue.timeUnit).format('YYYY-MM-DD HH:mm:ss'));
                this.setState({startValue:formatTime});
            }
        }else{
            this.setState({dataAbled:true});
        }
        this.zmVal = keyValue;
        this.searchParms();
    }
    leftTime(){
            if(this.state.endValue.valueOf() >= moment().valueOf()){
                this.setState({rightBtn:false});
            }else{
                this.setState({rightBtn:true});
            }
            const keyValue = this.state.zoomValue;
            const end = this.state.endValue,start=this.state.startValue;
            var endTime ='',startTime = '';
            if(!end && !start){
                Modal.error({content:'请选择时间段！'});
                return false;
            }
            if(end === null){
                startTime = moment(moment(start).add(-(keyValue.timeNum),keyValue.timeUnit).format('YYYY-MM-DD HH:mm:ss'));
                endTime = moment(moment(startTime).add((keyValue.timeNum),keyValue.timeUnit).format('YYYY-MM-DD HH:mm:ss'));
            }else if(start === null){
                endTime = moment(moment(end).add(-(keyValue.timeNum),keyValue.timeUnit).format('YYYY-MM-DD HH:mm:ss'));
                startTime = moment(moment(endTime).add(-(keyValue.timeNum),keyValue.timeUnit).format('YYYY-MM-DD HH:mm:ss'));
            }else{
                startTime = moment(moment(start).add(-(keyValue.timeNum),keyValue.timeUnit).format('YYYY-MM-DD HH:mm:ss'));
                endTime = moment(moment(startTime).add(keyValue.timeNum,keyValue.timeUnit).format('YYYY-MM-DD HH:mm:ss'));
            }
            this.setState({startValue:startTime});
            this.setState({endValue:endTime});
            this.lineTime = endTime;
            this.searchParms();
    }
    rightTime(){
        if(this.state.endValue.valueOf() >= moment().valueOf()){
            this.setState({rightBtn:false});
          }else{
            this.setState({rightBtn:true});
            const keyValue = this.state.zoomValue;
            const end = this.state.endValue,start=this.state.startValue;
            var endTime ='',startTime = '';
            if(!end && !start){
                Modal.error({content:'请选择时间段！'});
                return false;
            }
            if(end === null){
                startTime = moment(moment(start).add(keyValue.timeNum,keyValue.timeUnit).format('YYYY-MM-DD HH:mm:ss'));
                endTime = moment(moment(startTime).add((keyValue.timeNum),keyValue.timeUnit).format('YYYY-MM-DD HH:mm:ss'));
            }else if(start === null){
                endTime = moment(moment(end).add(keyValue.timeNum,keyValue.timeUnit).format('YYYY-MM-DD HH:mm:ss'));
                startTime = moment(moment(endTime).add(-(keyValue.timeNum),keyValue.timeUnit).format('YYYY-MM-DD HH:mm:ss'));
            }else{
                endTime = moment(moment(end).add(keyValue.timeNum,keyValue.timeUnit).format('YYYY-MM-DD HH:mm:ss'));
                startTime = moment(moment(endTime).add(-(keyValue.timeNum),keyValue.timeUnit).format('YYYY-MM-DD HH:mm:ss'));
            }
            this.setState({startValue:startTime});
            this.setState({endValue:endTime});
            this.lineTime = endTime;
            this.searchParms();
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { startValue, endValue, endOpen ,zoomValue} = this.state;
        let isDisabled = true;
        return(
            <Form>
                <div id="search_Chart">
                    <div className="name-dms ant-row ant-form-item">
                        {this.props.streamName ? <FormItem {...nameLayout} label="流名称">  
                            {getFieldDecorator('streamName',{initialValue: (this.props.streamName ? this.props.streamName:'')})(<Input  className="stream-input" type="text" disabled={isDisabled} />)}
                        </FormItem>:<DmsName dmcOption={this.dmcGet} dmsOption={this.dmsGet} dmcTag = {this.props.dmcTag ? this.props.dmcTag : this.state.dmcOption} dmsTag = {this.props.dmsTag ? this.props.dmsTag : this.state.dmsOption} />}
                        {this.props.streamName ? '' : <span className="tip">备注：不选择DMC时是指全局情况</span>}
                    </div>
                    <FormItem  {...formItemLayout} label="缩放">
                        {getFieldDecorator('zoom')(
                            <div className="zoom">
                                {zoom.map((item,index)=>{
                                  return <span key={index} data={item.data} onClick={()=>this.changeTime(item.key,item.valueKey)} 
                                  className={(this.state.active == item.key) ? "active":""}>{item.name}</span>
                                })}
                            </div>
                        )}
                    </FormItem>           
                    <FormItem  {...formItemLayout} label="时间段">
                        {getFieldDecorator('time')(
                            <div>
                            <a href="javascript:;" onClick = {this.leftTime.bind(this)}><Icon type="left" /></a>
                                <DatePicker
                                        disabledDate={disabledDate}
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                        value={startValue}
                                        placeholder="Start"
                                        onChange={this.onStartChange}
                                        onOpenChange={this.handleStartOpenChange}
                                        disabled={this.state.dataAbled}
                                        />
                                        <span className="date-or">至</span>
                                <DatePicker
                                    disabledDate={disabledDate}
                                    showTime
                                    format="YYYY-MM-DD HH:mm:ss"
                                    value={endValue}  
                                    placeholder="End"
                                    onChange={this.onEndChange}
                                    open={endOpen}
                                    onOpenChange={this.handleEndOpenChange}
                                    disabled={this.state.dataAbled}
                                />
                                <a href="javascript:;" onClick = {this.state.rightBtn ? this.rightTime.bind(this) : ''} className={this.state.rightBtn ? "" : "showBtn"}><Icon type="right" /></a>
                            </div>
                        )}
                    </FormItem>
                </div>
            </Form>
        )
    }
};
export default Form.create()(Search);