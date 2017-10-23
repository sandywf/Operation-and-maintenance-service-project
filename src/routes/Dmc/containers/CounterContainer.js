import { connect } from 'react-redux'
import { actions } from '../modules/counter'


import Counter from '../components/Counter'


const mapDispatchToProps = actions;
const mapStateToProps = (state) => ({
    data: state.dmc.data,
    pageCur:state.dmc.pageCur,
    pageDatas:state.dmc.pageDatas,
    pages:state.dmc.pages,
    areaData:state.dmc.areaData,
    areapageDatas:state.dmc.areapageDatas,
    areaCur:state.dmc.areaCur,
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
