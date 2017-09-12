import React from 'react';
import ReactDOM from 'react-dom';
import { Form,Menu, Dropdown,Input,Modal,Button,Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class Search extends React.Component {
  	handleSearch = (e) => {
    	e.preventDefault();
    	this.props.form.validateFields((err, values) => {
    	  	if (!err) {
        		let searchContent = (this.props.form.getFieldsValue());
        		for(let key in searchContent) {
        			if(searchContent[key]) {
        				searchContent[key] = [].concat(searchContent[key]);
        			} else {
        				searchContent[key] = [];
        			}
        			
        		}
        		this.props.valSearch(searchContent);
      		}
    	});
  	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return(
			<Form layout="inline" onSubmit={this.handleSearch}>
				<div className="table-search">
         			<FormItem label="DMC名称">  
                        {getFieldDecorator('dmcName')(<Input  type="text" placeholder="" />)}
         			</FormItem>
         			<FormItem label="活跃状态">
         			    {getFieldDecorator('activeStatus')(
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