import React from 'react';
import { Modal,Table } from 'antd';
import { IndexLink, Link } from 'react-router'
const item = [{
  name: '天津流',
  path:'',
  key: 'name',
},{
  name: '安徽流',
  path:'',
  key: 'age',
}];

class Modaldia extends React.Component {
    render() {
        return(
            <Modal title="活跃流" key={this.props.newKey} visible={this.props.visible} onCancel={this.props.del} footer={null}>
                <div id="area">
                {item.map((item,i)=>{
                        return <Link key={item.key} to={item.path} activeClassName='route--active'>
                                    {item.name}
                            </Link>
                    })}
                </div>
            </Modal>
        )
    }
};
export default Modaldia;
