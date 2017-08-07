import { connect } from 'react-redux'
import Search from "../components/Search"
import { actions } from '../modules/counter'
const mapStateToProps = (state,ownProps) =>{
    
}
const mapDispatchToprops = (dispatch,ownProps) =>{
    return{
        
    }
}
const FilterSearch = connect(
    mapStateToProps,
    mapDispatchToprops
)(Search)