import React from 'react'

import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'


type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasBullet?: boolean
  children?: React.ReactNode
}

const AsideMenuItem: React.FC<Props> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet = false,
}) => {

  return (
    <div className='menu-item'>
      <Link className={'menu-link without-sub'} to={to}>
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}

        <span className='menu-title'>{title}</span>
      </Link>
      {children}
    </div>
  )
}

export {AsideMenuItem}
