import React, { FC, useEffect } from 'react'
import { useLocation } from 'react-router'


type Props = {
  children?: React.ReactNode
}

const Content: FC<Props> = ({ children }) => {


  return (
    <div id='kt_content_container' className={''}>
      {children}
    </div>
  )
}

export { Content }
