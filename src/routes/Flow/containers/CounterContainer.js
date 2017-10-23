import { connect } from 'react-redux'
import { actions } from '../modules/counter'


import Counter from '../components/Counter'


const mapDispatchToProps = actions;
const mapStateToProps = (state) => ({
    data: state.flow.data,
    pageCur:state.flow.pageCur,
    pageDatas:state.flow.pageDatas,
    pages:state.flow.pages,
    areaData:state.flow.areaData,
    areaPageCur:state.flow.areaPageCur,
    areapageDatas:state.flow.areapageDatas,
    syncData:state.flow.syncData,
    syncPageCur:state.flow.syncPageCur,
    syncpageDatas:state.flow.syncpageDatas,
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
