import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { HeaderWrapper } from './components/header/HeaderWrapper'
import { AsideDefault } from './components/aside/AsideDefault'
import './index.css'

const MasterLayout = () => {


    return (
        <>
            <div className='d-flex flex-row flex-column' style={{ backgroundColor: '#222' }}>
                <div className='d-flex flex-column'>
                    <HeaderWrapper />

                    <div className='container-fluid min-vh-100 d-flex flex-column' >
                        <Outlet />
                    </div>
                    <div className='text-white d-flex justify-content-center'>
                        <span className='text-center'>© 2023 London UK,Romario Maia Inc. All rights reserved.</span>
                    </div>
                </div>
            </div>



        </>
    )
}

export { MasterLayout }

