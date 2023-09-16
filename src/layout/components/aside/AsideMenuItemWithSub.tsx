import React from 'react'

import { useLocation } from 'react-router'


type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasBullet?: boolean
  children?: React.ReactNode
}

const AsideMenuItemWithSub: React.FC<Props> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet,
}) => {



  return (
    <div
      className={'menu-accordion'}
      data-kt-menu-trigger='click'
    >
      <span className='menu-link' style={{ paddingRight: 20, paddingLeft: 20 }}>
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}
      
        <span className='menu-title'>{title}</span>
        <span className='menu-arrow'></span>
      </span>
      <div className={'menu-sub menu-sub-accordion'}>
        {children}
      </div>
    </div>
  )
}

export { AsideMenuItemWithSub }
