import React, {useRef, useEffect} from 'react'
import {useLocation} from 'react-router'

import {AsideMenuMain} from './AsideMenuMain'

import styles from './AsideMenu.module.css'

type Props = {
  asideMenuCSSClasses: string[]
}

const AsideMenu: React.FC<Props> = ({asideMenuCSSClasses}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const {pathname} = useLocation()

  useEffect(() => {
    setTimeout(() => {

      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0
      }
    }, 50)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <div
      id='kt_aside_menu_wrapper'
      ref={scrollRef}
      className={`hover-scroll-overlay-y my-5 my-lg-5 ${styles.leftMenu}`}
      data-kt-scroll='true'
      data-kt-scroll-activate='{default: false, lg: true}'
     data-kt-scroll-height='auto'
      data-kt-scroll-dependencies='#kt_aside_logo, #kt_aside_footer'
      data-kt-scroll-wrappers='#kt_aside_menu'
      data-kt-scroll-offset='0'
    >
      <div
        id='#kt_aside_menu'
        data-kt-menu='true'
        className={'menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500'}
      >
        <AsideMenuMain />
      </div>
    </div>
  )
}

export {AsideMenu}
