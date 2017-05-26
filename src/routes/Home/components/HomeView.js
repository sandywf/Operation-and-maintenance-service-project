import React from 'react';
import { Table, Icon, Popconfirm } from 'antd';   // 表格
import UpFlow from './UpFlow';// 全局上行流量折线图
import DownFlow from './DownFlow';// 全局下行流量折线图
import Unusual from './Unusual';// DMS异常状态table
import OverAll from './OverAll';// 全局状况
import classes from './HomeView.css';

export const HomeView = () => (
  <div id="home">
      <h4 className="ms-overall">
        <strong>全局</strong> 
        <i className="iconfont icon-Full-screen"></i> 
        <i>全屏</i>
      </h4>
      {/* 全局状况 */}
      <OverAll />
    <div className="ms-data">
    {/* DMS异常状态table */}
      <Unusual />
      <div className="ms-flowInfor fr linear">
        <p className="ms-status">
          <i className="iconfont icon-Traffic-information"></i>
          <span>流量信息</span>
        </p>
        <div className="ms-echarts">
        {/* 全局上行流量折线图 */}
          <UpFlow />
        </div>
        <div className="ms-echarts" id="main">
        {/* 全局下行流量折线图 */}
          <DownFlow />
        </div>
      </div>
    </div>    
  </div>
)
export default HomeView;