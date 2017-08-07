import React from 'react';
import { Table,Dropdown,Input,Modal,Button,Select } from 'antd';
const { Column, ColumnGroup } = Table;
class Topone extends React.Component {
        render() {
            return(
                <h4 className="ms-overall">
                    <strong>{this.props.title}</strong> 
                    <i className="iconfont icon-Full-screen"></i> 
                    <i>全屏</i>
                    <i className="iconfont icon-Export"></i> 
                    <i>导出</i>
                </h4>
            )
        }
};
export default Topone;