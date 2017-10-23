import { connect } from 'react-redux'
import { actions } from '../modules/counter'


import Counter from '../components/Counter'


const mapDispatchToProps = actions;
const mapStateToProps = (state) => ({
    data: state.home.data,
    unsual:state.home.unsual,
    unsualCur:state.home.unsualCur,
    unsualDatas:state.home.unsualDatas,
    flow:state.home.flowData,
    downFlowData:state.home.downFlowData,
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
