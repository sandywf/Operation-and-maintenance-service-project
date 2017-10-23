import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import '../../styles/core.scss'
//样式文件
import classes from './CoreLayout.scss'
class CoreLayout extends React.Component {
// export const CoreLayout = ({ children }) => (
  componentDidMount(){
    var body_element = document.getElementsByTagName("body")[0];
    body_element.style.backgroundColor= "#fff";
  }
  render(){
    const {children} = this.props;
    return (
  <div className={classes["wrmp"]}>
    <Header />
    <div className={classes["ms-main"]}>
      <div className={classes["core-layout__viewport"]}>
        {children}
      </div>
    </div>
    <div className={classes["clear"]}></div>
    <Footer />
  </div>
    )
  }
}

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
