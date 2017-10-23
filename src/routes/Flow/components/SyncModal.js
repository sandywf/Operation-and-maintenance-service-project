import React from 'react';
import { Modal,Table } from 'antd';
import {hashHistory} from 'react-router';
import {createHashHistory} from 'history';
var routerHistory =  require('react-router').useRouterHistory;  
const appHistory = routerHistory(createHashHistory)({queryKey:false});  

class Modaldia extends React.Component {
    jumpLink=(link,dmc)=>{
        appHistory.push({
            pathname: link,
            query: {
                dmsName:dmc
            },
        })
    }
    render() {
        const diacolumns = [{
            title: '原始DMS',
            dataIndex: 'sourceDmsName',
            key: 'sourceDmsName',
            render: (text,record) => <a href="javascript:;" onClick={()=>this.jumpLink('dms',record.sourceDmsName)}>{record.sourceDmsName+'('+record.sourceDmcName+')'}</a>,
          },{
              title: '目标DMS',
              dataIndex: 'targetDmsName',
              key: 'targetDmsName',
              render: (text,record) => <a href="javascript:;" onClick={()=>this.jumpLink('dms',record.targetDmsName)}>{record.targetDmsName+'('+record.targetDmcName+')'}</a>,
            },{
            title: '流量',
            dataIndex: 'flow',
            key: 'flow',
          },{
              title: '丢包率',
              dataIndex: 'dropRate',
              key: 'dropRate',
            }];          
        return(
            <Modal title="DMS" key={this.props.newKey} visible={this.props.visible} onCancel={this.props.del} footer={null}>
                <div id="area"><Table rowKey={(record)=>record.sourceDmsName+'('+record.sourceDmcName+')'}  dataSource={this.props.modalSource} columns={diacolumns} onChange={this.props.onChange} pagination={this.props.pagination} /></div>
            </Modal>
        )
    }
};
export default Modaldia;