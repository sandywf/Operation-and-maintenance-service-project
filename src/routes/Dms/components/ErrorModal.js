import React from 'react';
import { Modal,Table ,Button } from 'antd';
const diacolumns = [{
  title: '错误码',
  dataIndex: 'code',
  key: 'code',
},{
    title: '最新发生时间',
    dataIndex: 'lastOccureTime',
    key: 'lastOccureTime',
  },{
    title: '级别',
    dataIndex: 'level',
    key: 'level',
  },{
    title: '错误文字描述',
    dataIndex: 'massage',
    key: 'massage',
  },{
    title: '错误发生次数',
    dataIndex: 'occurNum',
    key: 'occurNum',
  }];

class AddressModal extends React.Component {
    render() {
        return(
            <Modal title="错误报告" key={this.props.newKey} visible={this.props.visible} onCancel={this.props.del} footer={null}>
                <div id="area">
                    <div className="reload">DMS名称 <Button onClick= {this.props.reset}>重置</Button>说明：重置之后异常标记消失</div>
                    <Table rowKey={record=>record.code}  dataSource={this.props.modalSource} columns={diacolumns} onChange={this.props.onChange} pagination={this.props.pagination} /></div>
            </Modal>
        )
    }
};
export default AddressModal;
