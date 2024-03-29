import React from 'react';
import ReactDOM from 'react-dom';
import { Form,Menu, Dropdown,Input,Modal,Button,Select } from 'antd';
import DmsName from '../../../components/common/DmsName';

const FormItem = Form.Item;
const Option = Select.Option;

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state={selectName:(this.props.selectName ? this.props.selectName : ''),dmcOption: (this.props.dmcTag ? this.props.dmcTag : ''),dmsOption:(this.props.dmsTag ? this.props.dmsTag : '')}
    }
    componentDidMount(){
        this.search()
    }
    search (){
        if(this.props.dmcTag || this.props.dmsTag){
            const params = {dmcTag:this.props.dmcTag,dmsTag:this.props.dmsTag,ip:'',streamName:''};
            this.props.valSearch(params);
        }
        if(this.props.ip){
            const params = {dmcTag:'',dmsTag:'',ip:this.props.ip,streamName:''};
            this.props.valSearch(params);
        }
        if(this.props.streamName){
            const params = {dmcTag:'',dmsTag:'',ip:'',streamName:this.props.streamName};
            this.props.valSearch(params);
        }
    }
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //values.dmcTag = this.state.selectName;
                values.dmcTag = this.state.dmcOption;
                values.dmsTag = this.state.dmsOption;
                this.props.valSearch(values);
            }
        });
    }
    // changeOption=(value)=>{
    //     this.setState({selectName:value});
    // }
    dmcOption=(value)=>{
        this.setState({dmcOption:value});
    }
    dmsOption=(value)=>{
        this.setState({dmsOption:value});
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form layout="inline" onSubmit={this.handleSearch}>
                <div className="table-search">
                    <DmsName dmcOption={this.dmcOption} dmsOption={this.dmsOption} dmcTag = {this.props.dmcTag} dmsTag = {this.props.dmsTag} />
                    <FormItem label="流名称">  
                        {getFieldDecorator('streamName',{initialValue:(this.props.streamName ? this.props.streamName:'')})(<Input  type="text" />)}
                    </FormItem>
                    <FormItem label="独立IP">  
                        {getFieldDecorator('ip',{initialValue:(this.props.ip ? this.props.ip:'')})(<Input  type="text" />)}
                    </FormItem>
                    <Button type="primary" htmlType="submit">查询</Button>
                </div>
            </Form>
        )
    }
};
export default Form.create()(Search);