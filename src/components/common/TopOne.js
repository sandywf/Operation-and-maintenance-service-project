import React from 'react';
import { Table,Dropdown,Input,Modal,Button,Select } from 'antd';
const { Column, ColumnGroup } = Table;
import FormatUtils from '../../public/_module/js/common.js';
var status=false;
const fullScreen=(name)=>{
    status=!status;
    var elem = document.getElementById(name);   
    FormatUtils.requestFullScreen(elem,status);
};
const Topone = (props)=>
    <h4 className="ms-overall">
        <strong>{props.title}</strong> 
        <i className="iconfont icon-Full-screen" onClick={ (e) =>fullScreen(props.name) }></i> 
        <i>全屏</i>
        {/* <i className="iconfont icon-Export"></i> 
        <i>导出</i> */}
    </h4>
export default Topone;