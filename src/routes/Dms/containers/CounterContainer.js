import { connect } from 'react-redux'
import { actions } from '../modules/counter'


import Counter from '../components/Counter'


const mapDispatchToProps = actions;
const mapStateToProps = (state) => ({
    data: state.dms.data,
    pageCur:state.dms.pageCur,
    pageDatas:state.dms.pageDatas,
    pages:state.dms.pages,
    areaData:state.dms.areaData,
    areapageDatas:state.dms.areapageDatas,
    addressData:state.dms.addressData,
    addressPageDatas:state.dms.addressPageDatas,
    areaPageCur:state.dms.areaPageCur,
    addressCur:state.dms.addressCur,
    errorData:state.dms.errorData,
    errorCur:state.dms.errorCur,
    errorPageDatas:state.dms.errorPageDatas,
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
