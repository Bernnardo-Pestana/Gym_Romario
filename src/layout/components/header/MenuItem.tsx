import React from 'react'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'


type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasArrow?: boolean
  hasBullet?: boolean
}

const MenuItem: React.FC<Props> = ({
  to,
  title,
  icon,
  fontIcon,
  hasArrow = false,
  hasBullet = false,
}) => {
  const {pathname} = useLocation()

  return (
    <div className='menu-item me-lg-1'>
      <Link
        className={'menu-link py-3'}
        to={to}
      >
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}

        {icon && (
          <span className='menu-icon'>
           
          </span>
        )}

        {fontIcon && (
          <span className='menu-icon'>
            <i className={'bi fs-3'}></i>
          </span>
        )}

        <span className='menu-title'>{title}</span>

        {hasArrow && <span className='menu-arrow'></span>}
      </Link>
    </div>
  )
}

export {MenuItem}
