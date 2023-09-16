/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import style from './AsideMenu.module.css'

import { AsideMenu } from './AsideMenu'
//import useAuth from '../../../../app/hooks/useAuth'

const AsideDefault: FC = () => {

  //const { loginInfo } = useAuth()


  return (
    <div
      className={`${style.aside} `}

    >
  {/* begin::Brand */ }
  < div className = 'd-flex flex-column flex-shrink-0 p-3  text-white bg-dark' >
    {/* begin::Logo */ }
    <Link to = '/dashboard' >
      <img src="logo.png" alt="" className={'img-fluid  my-5 border-b-2'} />
        </Link >
      </div >

  <div className='d-flex flex-column  align-items-center  h-100 bg-dark'>
    <div className='mt-2'>
      <Link to='/dashboard'>
        <span className='text-white'>Dashboard</span>
      </Link>
    </div>

    <div className='mt-3'>
      <Link to='/dashboard'>
        <span className='text-white'>Parking</span>
      </Link>
    </div>

    <div className='mt-3'>
      <Link to='/dashboard'>
        <span className='text-white'>Task</span>
      </Link>
    </div>
  </div>
{/* end::Aside menu */ }

{/* begin : Version: APP */ }

<div className='d-flex  justify-content-center bg-dark'>
  <Link to='/dashboard'>
    <h2 style={{ color: '#FFF', margin: 0, fontSize: 14 }}>Version 1.0.0</h2>
  </Link>
</div>

{/* end : Version: APP */ }
    </div >

  )
}

export { AsideDefault }
