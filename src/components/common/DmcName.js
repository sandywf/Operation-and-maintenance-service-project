import React from 'react';
import { Select } from 'antd';
import HTTPUtil from '../../utils/request';

const Option = Select.Option;

class DmcName extends React.Component {
    state={
        nameList : []
    }
    componentDidMount (){
        HTTPUtil.get('/dmc/all-dmc/get','',HTTPUtil.headers).then((json) => {  
                //处理 请求success  
                if(json){
                    this.setState({nameList:json.result})
                }
            },(json)=>{
             //TODO 处理请求fail  
        })  
    }
    handleChange=(value)=>{
        this.props.changeOption(value);
    }
    render() {
        const {dmcTag} = this.props;
        return(
            <Select onChange={this.handleChange} defaultValue={dmcTag}>
                <Option value=""></Option>
                {(this.state.nameList) ? this.state.nameList.map((item,index) =>[<Option key={index} value={item.dmcTag}>{item.dmcName}</Option>]) : ''}
            </Select>
        )
    }
}
    
export default DmcName;