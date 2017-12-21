import React from 'react';
import ReactDOM from 'react-dom';
import { Form,Select } from 'antd';
import HTTPUtil from '../../utils/request';
const FormItem = Form.Item;
const Option = Select.Option;
var nameList = [];
class DmcSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            selectName:'',
            dmsdefault:this.props.dmsTag,
            visibile:false,
            dmsList:[],
            listDmc:[]
        }
    }
    componentDidMount (){
        this.getDmc();
        if(this.props.dmcTag){
            const params = {dmcTag:this.props.dmcTag};
            this.getDms(params,true);
        }
    }
    componentWillMount(){
        if(this.props.dmsTag){
            this.setState({visibile:true});
        }
    }
    getDmc=()=>{
        HTTPUtil.get('/dmc/all-dmc/get','').then((json) => {  
            //处理 请求success  
            if(json){
                nameList=json.result;
                this.setState({listDmc:json.result});
            }
        },(json)=>{
         //TODO 处理请求fail  
        }) ;
    }
    getDms=(params,tag)=>{
        let formData = new FormData();  
        formData.append("dmcTag",params.dmcTag); 
        HTTPUtil.post('/stream/dms/get',formData).then((json) => {  
            //处理 请求success  
            if(json){
                if(json.result === undefined || json.result.length == 0){
                    this.setState({visibile:false});
                }else{
                    this.setState({dmsList:json.result});
                }
                if(!tag){
                    this.setState({dmsdefault:''});
                    this.props.dmsOption('');
                }
            }
        },(json)=>{
         //TODO 处理请求fail  
        })  
    }
    changeOption=(value)=>{
        this.setState({dmsdefault:''});
        this.props.dmsOption('');
        const params = {dmcTag:value};
        if(value==''){
            this.setState({visibile:false});
        }else{
            this.setState({visibile:true});
            this.getDms(params,false);
        }
        this.props.dmcOption(value);
    }
    dmsChange = (value) => {
        this.setState({
            dmsdefault: value,
        });
        this.props.dmsOption(value);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const {dmcTag,dmsTag} = this.props;

        return(
            <div className="dms-option ant-row ant-form-item">
                <FormItem label="DMC名称">
                {getFieldDecorator('dmc',{ initialValue: dmcTag})(
                    <Select onChange={this.changeOption} >
                        <Option key="3_deef" value=""></Option>
                        {(this.state.listDmc) ? this.state.listDmc.map((item,index) =>[<Option key={'li' + index} value={item.dmcTag}>{item.dmcName}</Option>]) : ''}
                    </Select>
                                    )}
                </FormItem>
                {this.state.visibile ? 
                    <FormItem label="DMS名称"> 
                        {/* {getFieldDecorator('dms',{ initialValue:(this.state.dmsList.length > 0 ? this.state.dmsdefault :'')})( */}
                        <Select onChange={this.dmsChange} value={this.state.dmsList.length > 0 ? this.state.dmsdefault :''}>
                            {(this.state.dmsList) ? this.state.dmsList.map((province,index) => <Option key={'dms' + index} value={province.dmsTag}>{province.dmsName}</Option>) : ''}
                        </Select>
                        {/* )} */}
                    </FormItem> 
                : ''}
            </div>
        )
    }
}

export default Form.create()(DmcSelect);