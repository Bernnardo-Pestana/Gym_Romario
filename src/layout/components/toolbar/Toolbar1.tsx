/* eslint-disable jsx-a11y/anchor-is-valid */

import { FC } from 'react'

import { DefaultTitle } from '../header/page-title/DefaultTitle'

const Toolbar1: FC = () => {


  return (
    <div className='toolbar' >
      <div
        id='kt_toolbar_container'
        className={'d-flex flex-stack'}
      >
        <DefaultTitle />
      </div>
    </div>
  )
}

export { Toolbar1 }
