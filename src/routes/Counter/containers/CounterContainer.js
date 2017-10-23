import { connect } from 'react-redux'
import { actions } from '../modules/counter'


import Counter from '../components/Counter'


const mapDispatchToProps = actions;
const mapStateToProps = (state) => ({
    data: state.independentIp.data,
    pageCur:state.independentIp.pageCur,
    pageDatas:state.independentIp.pageDatas,
    pages:state.independentIp.pages,
    flowData:state.independentIp.flowData,
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
