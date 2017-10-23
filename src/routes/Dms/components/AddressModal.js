import React from 'react';
import { Modal,Table } from 'antd';
const diacolumns = [{
  title: 'WebSocket端口',
  dataIndex: 'websocketUri',
  key: 'websocketUri',
},{
    title: 'RTMP地址',
    dataIndex: 'rtmpUri',
    key: 'rtmpUri',
  },{
    title: '内网/外网',
    dataIndex: 'networkType',
    key: 'networkType',
  },{
    title: '网络运营商',
    dataIndex: 'vender',
    key: 'vender',
  }];

class AddressModal extends React.Component {
    render() {
        return(
            <Modal title="地址列表" key={this.props.newKey} visible={this.props.visible} onCancel={this.props.del} footer={null} width='730'>
                <div id="area">
                    <Table rowKey={this.props.newKey}  dataSource={this.props.modalSource} columns={diacolumns} onChange={this.props.onChange} pagination={this.props.pagination} />
                </div>
            </Modal>
        )
    }
};
export default AddressModal;
