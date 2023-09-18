import { Navigate, Route, Routes } from "react-router-dom"
import { Dashboard } from "../pages/dashboard"
import { MasterLayout } from '../layout/MasterLayout'
import { Exercises } from "../pages/exercices"
import { Setting } from "../pages/setings"
import { UpdateUser } from "../pages/user/create"
import { History } from "../pages/historico"

const PrivateRoutes = () => {
    return (
        <Routes>
            <Route
                element={<MasterLayout />}>
                {/* Redirect to Dashboard after success login/registartion */}
                <Route path='auth/*' element={<Navigate to='/dashboard' />} />
                {/* Pages */}

                <Route path='dashboard' element={<Dashboard />} />
                <Route path='exercises' element={<Exercises />} />
                <Route path='history' element={<History />} />
                <Route path='settings' element={<Setting />} />
                <Route path='user/update' element={<UpdateUser />} />
            </Route>
        </Routes>
    )
}

export { PrivateRoutes }
