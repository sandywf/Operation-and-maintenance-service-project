import React from 'react';
import { Form,Menu, Dropdown,Input,Modal,Button,Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class Search extends React.Component {
	componentDidMount(){
        this.search()
    }
    search (){
        if(this.props.dmcName){
            const params = {dmcName:this.props.dmcName,activeStatus:''};
            this.props.valSearch(params);
        }
    }
  	handleSearch = (e) => {
    	e.preventDefault();
    	this.props.form.validateFields((err, values) => {
    	  	if (!err) {	  
        		this.props.valSearch(values);
      		}
    	});
  	}
	render() {
		const { getFieldDecorator } = this.props.form;
		return(
			<Form layout="inline" onSubmit={this.handleSearch}>
				<div className="table-search">
         			<FormItem label="DMC名称">  
						{getFieldDecorator('dmcName',{initialValue:(this.props.dmcName ? this.props.dmcName:'')})(<Input  type="text" />)}
         			</FormItem>
         			<FormItem label="活跃状态">
         			    {getFieldDecorator('activeStatus',{ initialValue: ''})(
         				   <Select>
         				       <Option value=""></Option>
         				       <Option value="Y">活跃</Option>
         				       <Option value="N">不活跃</Option>
         				   </Select>
         				)}
         			</FormItem>
        			<Button type="primary" htmlType="submit">查询</Button>
        		</div>
        	</Form>
		)
	}
};
export default Form.create()(Search);