import React from 'react';
import ReactDOM from 'react-dom';
import { Form,Menu, Dropdown,Input,Modal,Button,Select } from 'antd';
import DmcName from '../../../components/common/DmcName';
const FormItem = Form.Item;
const Option = Select.Option;


class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state={selectName:(this.props.dmcTag ? this.props.dmcTag : '')}
    }
    componentDidMount(){
        this.search()
    }
    search =()=>{
        if(this.props.dmcTag || this.props.dmsName){
            const dmcTag = {dmcTag:this.props.dmcTag,dmsName:this.props.dmsName,isAlive:this.props.isAlive,isOnline:'',serverType:''};
            this.props.valSearch(dmcTag);
        }
    }
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.dmcTag = this.state.selectName;
                this.props.valSearch(values);
            }
        });
    }
    changeOption=(value)=>{
        this.setState({selectName:value});
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form layout="inline" onSubmit={this.handleSearch}>
                <div className="table-search">
                    <FormItem label="DMC名称">
                        {getFieldDecorator('dmcTag')(
                            <DmcName changeOption={this.changeOption} dmcTag = {this.props.dmcTag} />
                        )}
                    </FormItem>
                    <FormItem label="DMS名称">  
                        {getFieldDecorator('dmsName',{initialValue:(this.props.dmsName ? this.props.dmsName:'')})(<Input  type="text" placeholder="" />)}
                    </FormItem>
                    <FormItem label="服务器类型">
                        {getFieldDecorator('serverType',{initialValue: '',})(
                            <Select>
                              <Option value=""></Option>
                              <Option value="INTERACT">互动</Option>
                              <Option value="VISITOR">观摩</Option>
                              <Option value="ALL">互动观摩</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="活跃状态">
                        {getFieldDecorator('isAlive',{initialValue:(this.props.isAlive ? this.props.isAlive:'')})(
                            <Select>
                              <Option value=""></Option>
                              <Option value="Y">活跃</Option>
                              <Option value="N">不活跃</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="在线状态">
                        {getFieldDecorator('isOnline',{initialValue: '',})(
                            <Select>
                              <Option value=""></Option>
                              <Option value="Y">在线</Option>
                              <Option value="N">不在线</Option>
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