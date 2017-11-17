import React from 'react';
import { Modal,Table } from 'antd';

import {hashHistory} from 'react-router';
import {createHashHistory} from 'history';
var routerHistory =  require('react-router').useRouterHistory;  
const appHistory = routerHistory(createHashHistory)({queryKey:false});  

class Modaldia extends React.Component {
     jumpFlow=(link,flow)=>{
        appHistory.push({
            pathname: link,
            query: {
                streamName:flow,
            },
        })
    }
    render() {
        const {modalSource}=this.props;
        return(
            <Modal title="活跃流" key={this.props.newKey} visible={this.props.visible} onCancel={this.props.del} footer={null}>
                <div id="active_flow">
                    {modalSource && modalSource.map((item,i)=>{
                        return <a href="javascript:;" key={i} onClick={()=>this.jumpFlow('flow',item)} >
                                    {item}
                            </a>
                    })}
                </div>
            </Modal>
        )
    }
};
export default Modaldia;
