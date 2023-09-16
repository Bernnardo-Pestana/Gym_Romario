import { Outlet, Route, Routes } from 'react-router-dom'
import { Login } from './login/Login'
import './index.css'
import { Cadastro } from './cadastro/cadastro'
import { Reset } from './resetPassword/reset'

const AuthLayout = () => {


  return (
    <div className='d-flex flex-column flex-md-row h-100'>
      <div className='w-100 w-md-50 d-flex flex-column flex-md-center justify-content-center  align-items-center h-100 h-md-50 p-10 pb-lg-20 bg-black'

      >

        <h3 className='text-white'>Adapt Active</h3>
        <div className='w-md-100 w-75 p-md-10 p-lg-15 mx-auto'  >

          <Outlet />
        </div>

      </div>
    </div>
  )

}

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<Login />} />
      <Route path='new' element={<Cadastro />} />
      <Route path='new-password' element={<Reset />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
)

export { AuthPage }
