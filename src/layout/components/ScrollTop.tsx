import React, {useEffect, useRef} from 'react'
import {useLocation} from 'react-router-dom'


export function ScrollTop() {
  const {pathname} = useLocation()
  const isFirstRun = useRef(true)

  


  return (
    <div id='kt_scrolltop' className='scrolltop' data-kt-scrolltop='true'>
     
    </div>
  )
}
