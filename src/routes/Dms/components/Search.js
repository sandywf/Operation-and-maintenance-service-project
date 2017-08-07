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
                        {getFieldDecorator('name')(
                            <Select>
                                <Option value=""></Option>
                                <Option value="John">John</Option>
                                <Option value="srown">Joe Srown</Option>
                                <Option value="black">Joe Black</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="DMS名称">  
                        {getFieldDecorator('dmsname')(<Input  type="text" placeholder="" />)}
                    </FormItem>
                    <FormItem label="服务器类型">
                        {getFieldDecorator('server')(
                            <Select>
                              <Option value=""></Option>
                              <Option value="互动">互动</Option>
                              <Option value="观摩">观摩</Option>
                              <Option value="互动观摩">互动观摩</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="活跃状态">
                        {getFieldDecorator('active')(
                            <Select>
                              <Option value=""></Option>
                              <Option value="活跃">活跃</Option>
                              <Option value="不活跃">不活跃</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="在线状态">
                        {getFieldDecorator('online')(
                            <Select>
                              <Option value=""></Option>
                              <Option value="在线">在线</Option>
                              <Option value="不在线">不在线</Option>
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