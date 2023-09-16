
import React, {FC} from 'react'
import {Link} from 'react-router-dom'


const DefaultTitle: FC = () => {

  return (
    <div
      id='kt_page_title'
      data-kt-swapper='true'
      data-kt-swapper-mode='prepend'
      data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}"
      className={''}
    >
      {/* begin::Title */}
  
    </div>
  )
}

export {DefaultTitle}
