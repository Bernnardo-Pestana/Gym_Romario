
import {FC, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {Button} from '../../../pages/components/Button/Button'

//import useAuth from '../../../../app/hooks/useAuth'
import styles from './Header.module.css'

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px'

const Topbar: FC = () => {
  const navigate = useNavigate()
 // const { loginInfo, verifyAdm } = useAuth();


  return (
    <div className='d-flex align-items-center justify-content-between flex-shrink-1 w-100'>



      <Button
        text={'Here'}
        color='primary'
        iconColor='#FFF'
        icon='fas fa-home'
        size='small'
        horizontalPadding={4}
        verticalPadding={3}
        btnAttr={{
          type: 'button',
        }}
        click={() => navigate('/dashboard')}
        uppercase={true}
        btnClass='mx-4 fs-thin'
      />


      

      {/* begin::User */}
      <div
        className={'d-flex align-items-center'}
        id='kt_sidebar_perfil_toggle'
      >
        {/* begin::Toggle */}
        <div
          className={'cursor-pointer symbol'}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='bottom'
        >
          <div
            className='btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2 bg-hover-light'
            id='kt_quick_user_toggle'
          >
            <span className='text-muted fw-bold fs-base d-none d-md-inline me-1'>Olá,</span>
            <span className='text-gray-600 fw-bolder fs-base d-none d-md-inline me-3'>{'loginInfo.name'}</span>
            <span
              className={`${styles.icon_badge} fs-5 fw-bold rounded d-flex align-items-center justify-content-center`}
            >
              M
            </span>
          </div>
        </div>
        {/* end::Toggle */}
      </div>
      {/* end::User */}
    </div>
  )
}

export {Topbar}
