import { FC } from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import App from '../App'
import { Login } from '../pages/login/login/Login'
import { PrivateRoutes } from './PrivateRoute'
import { AuthPage } from '../pages/login/AuthPage'
import useAuth from '../hooks/useAuth'

const AppRoutes: FC = () => {

    const { loginInfo } = useAuth()
    return (

        <BrowserRouter>
            <Routes>
                <Route element={<App />}>

                    {loginInfo.accessToken ? (
                        <>
                            <Route path='/*' element={<PrivateRoutes />} />
                            <Route index element={<Navigate to='/dashboard' />} />
                        </>
                    ) : (
                        <>
                            <Route path='auth/*' element={<AuthPage />} />
                            <Route path='*' element={<Navigate to='/auth' />} />
                        </>
                    )}
                </Route>
            </Routes>
        </BrowserRouter>

    )

}
export { AppRoutes }