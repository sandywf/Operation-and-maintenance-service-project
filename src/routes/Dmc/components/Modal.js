import React from 'react';
import { Modal,Table } from 'antd';
const diacolumns = [{
  title: '区域',
  dataIndex: 'areaName',
  key: 'areaName',
},{
  title: '数量',
  dataIndex: 'num',
  key: 'num',
}];

class Modaldia extends React.Component {
    render() {
        return(
            <Modal title="区域分布" key={this.props.Key} visible={this.props.visible} onCancel={this.props.del} footer={null}>
                <div id="area"><Table rowKey={(record,key) => key} dataSource={this.props.modalSource} columns={diacolumns} onChange={this.props.onChange} pagination={this.props.pagination} /></div>
            </Modal>
        )
    }
};
export default Modaldia;
