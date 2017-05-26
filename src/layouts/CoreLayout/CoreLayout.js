import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import '../../styles/core.scss'
//样式文件
import classes from './CoreLayout.scss'

export const CoreLayout = ({ children }) => (
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

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
