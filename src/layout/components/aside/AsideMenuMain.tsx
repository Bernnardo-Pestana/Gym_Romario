/* eslint-disable react/jsx-no-target-blank */

import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'
import {useEffect, useState} from 'react'


type MenuType = {
  icon: string
  id: number
  name: string
  newIcon: string
  order: number
  parent: number
  route: string
  submenu: SubMenuType[]
  type: string
  permissionParent?: boolean
}

type SubMenuType = {
  id: number
  name: string
  newIcon: string
  order: number
  parent: number
  router: string
}

export function AsideMenuMain() {
  

  const [menu, setMenu] = useState<MenuType[]>([])
  //const {loginInfo, verifyAdm} = useAuth()


  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/general/gen001.svg'
        title={'Dashboard'}
        fontIcon='bi-app-indicator'
      />

      {/* {(loginInfo.profile === 'admin' || loginInfo.profile === 'owner') && (
        <AsideMenuItemWithSub
          to='/configuracoes'
          title={i18n.t(`permissions.settings`)}
          icon='/media/icons/duotune/coding/cod001.svg'
        >
          <AsideMenuItem
            to='/configuracoes/modalidades'
            title={i18n.t(`modalities.modalities`)}
            hasBullet={true}
          />
          <AsideMenuItem
            to='/configuracoes/taxa-entrega'
            title={i18n.t(`delivery_fee.delivery_fee`)}
            hasBullet={true}
          />
          <AsideMenuItem
            to='/configuracoes/usuarios'
            title={i18n.t(`user.user`)}
            hasBullet={true}
          />
          <AsideMenuItem
            to='/configuracoes/grupos'
            title={i18n.t(`groups.groups`)}
            hasBullet={true}
          />
          <AsideMenuItem
            to='/configuracoes/turnos'
            title={i18n.t(`shifts.shifts`)}
            hasBullet={true}
          />
          <AsideMenuItem
            to='/configuracoes/conta'
            title={i18n.t(`account.account`)}
            hasBullet={true}
          />
          <AsideMenuItem
            to='/configuracoes/termos'
            title={i18n.t(`terms.terms`)}
            hasBullet={true}
          />
          <AsideMenuItem
            to='/configuracoes/planos-pagamento'
            title={i18n.t(`payment_plans.payment_plans`)}
            hasBullet={true}
          />
        </AsideMenuItemWithSub>
      )} */}

    </>
  )
}
