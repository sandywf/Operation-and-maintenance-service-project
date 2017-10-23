import { connect } from 'react-redux'
import { actions } from '../modules/zen'


import Counter from '../components/Zen'


const mapDispatchToProps = actions;
const mapStateToProps = (state) => ({
    data: state.zen.data,
    data2:state.zen.data2,
    pageCur:state.zen.pageCur,
    pageDatas:state.zen.pageDatas,
    pages:state.zen.pages,
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
