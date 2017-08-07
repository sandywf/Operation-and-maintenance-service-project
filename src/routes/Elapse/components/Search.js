import React from 'react';
import ReactDOM from 'react-dom';
import {DatePicker,Button, Row, Col,Tabs, Select,Icon,Form,Input} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
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
class Search extends React.Component {
    state = {
        active:1
    };
    changeTime(key){ 
      this.setState({active: key});
      console.log(key);
    }
    onChange(date, dateString){
        console.log(date, dateString);
    }
    handleChange(value){
        console.log(`selected ${value}`);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form>
                <div className="table-search">
                    <FormItem  {...formItemLayout} label="DMC名称">
                        <Row gutter={16}>
                            <Col span={8}>
                                {getFieldDecorator('name')(
                                    <Select onChange={this.handleChange}>
                                      <Option value=""></Option>
                                      <Option value="dmc">dmc</Option>
                                      <Option value="天津">天津</Option>
                                    </Select>
                                )}
                            </Col>
                            <Col span={16}>
                                <span>备注：不选择DMC时是指全局情况</span>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem  {...formItemLayout} label="缩放">
                        {getFieldDecorator('zoom')(
                            <div className="zoom">
                                {zoom.map((item,index)=>{
                                  return <span key={index} data={item.data} onClick={()=>this.changeTime(item.key)} 
                                  className={this.state.active === item.key ? "active":""}>{item.name}</span>
                                })}
                            </div>
                        )}
                    </FormItem>
                    <FormItem  {...formItemLayout} label="时间段">
                        {getFieldDecorator('time')(
                            <RangePicker onChange={this.onChange} />
                        )}
                    </FormItem>
                </div>
            </Form>
        )
    }
};
export default Form.create()(Search);