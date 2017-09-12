import { connect } from 'react-redux'
import { actions } from '../modules/counter'


import Counter from '../components/Counter'

const mapDispatchToProps = actions;
const mapStateToProps = (state) => ({
    data: state.user.data,
    current: state.user.current,
    isVisible:state.user.isVisible
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)