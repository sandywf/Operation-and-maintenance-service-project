import { connect } from 'react-redux'
import { actions } from '../modules/counter'


import Counter from '../components/Counter'


const mapDispatchToProps = actions;
const mapStateToProps = (state) => ({
    data: state.independentIp.data,
    data2:state.independentIp.data2
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
