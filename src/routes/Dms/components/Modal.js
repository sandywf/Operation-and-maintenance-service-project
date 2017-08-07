import React from 'react';
import { Modal,Table } from 'antd';
const diacolumns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
},{
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
}];

class Modaldia extends React.Component {
    render() {
        return(
            <Modal title="区域分布" key={this.props.newKey} visible={this.props.visible} onCancel={this.props.del} footer={null}>
                <div id="area"><Table dataSource={this.props.modalSource} columns={diacolumns} /></div>
            </Modal>
        )
    }
};
export default Modaldia;
