import { connect } from 'react-redux'
import { actions } from '../modules/counter'


import Counter from '../components/Counter'


const mapDispatchToProps = actions;
const mapStateToProps = (state) => ({
    data: state.flow.data,
    data2:state.flow.data2
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
