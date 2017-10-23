import { connect } from 'react-redux'
import { actions } from '../modules/counter'


import Counter from '../components/Counter'


const mapDispatchToProps = actions;
const mapStateToProps = (state) => ({
    dmsData: state.elapse.dmsData,
    flowData:state.elapse.flowData
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
