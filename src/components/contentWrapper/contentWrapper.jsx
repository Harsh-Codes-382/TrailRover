import React from 'react'
import "./style.scss"
// Basically  we make the contentWrapper so we can center various html componenets which present between the contentWrapper tag
// and we can import the contentwrapper in any component of react to center the rest of html 
const contentWrapper = ({ children }) => {
  return (
    <div className='contentWrapper'>
      {children}          {/* children means everything we write within a <ContentWrapper> <ContentWrapper/> will be here */}
    </div>
  )
}

export default contentWrapper;
