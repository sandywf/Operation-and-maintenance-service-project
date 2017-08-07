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
                        {getFieldDecorator('cDmc')(
                            <Select>
                                <Option value=""></Option>
                                <Option value="天津DMC">天津DMC</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="流名称">  
                        {getFieldDecorator('cFlow')(<Input  type="text" />)}
                    </FormItem>
                    <FormItem label="独立IP">  
                        {getFieldDecorator('cIp')(<Input  type="text" />)}
                    </FormItem>
                    <Button type="primary" htmlType="submit">查询</Button>
                </div>
            </Form>
        )
    }
};
export default Form.create()(Search);