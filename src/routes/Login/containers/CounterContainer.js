import { connect } from 'react-redux'
import { login} from '../modules/counter'

import Counter from '../components/Counter'

const mapDispatchToProps = {
  login
}

const mapStateToProps = (state) => ({
  data: state.login.data
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
