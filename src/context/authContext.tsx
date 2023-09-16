import api, { setBearerToken, setBearerTokenAdm } from '../services/api'
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import { parseJwt } from '../utils/utils';

export type DecodedTokenData = {
    accessToken: string,
    name: string,
    email: string,
    surname: string,
    id: string,
    admin: string,
}

type LoginData = {
    accessToken: string,
    name: string,
    email: string,
    surname: string,
    id: string,
    profile: string,
}

type AuthContextData = {
    loginInfo: LoginData
    setLoginInfo: Dispatch<SetStateAction<LoginData>>

    logout: () => void;

}

type AuthContextProvider = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

const AuthProvider = ({ children }: AuthContextProvider) => {
    const [loginInfo, setLoginInfo] = useState<LoginData>({
        accessToken: '',
        name: '',
        email: '',
        surname: '',
        id: '',
        profile: '',
    })

    const logout = () => {
        setBearerToken('')
        setBearerTokenAdm('')
        localStorage.removeItem('loginInfo')
        localStorage.removeItem('loginInfo')
        setLoginInfo({
            accessToken: '',
            name: '',
            email: '',
            surname: '',
            id: '',
            profile: '',
        })
    }

    const getInitialData = () => {
        let login = localStorage.getItem('loginInfo')
        if (login && typeof login === 'string') {
            const data = JSON.parse(login)
            if (data) {
                const tkNoSalt = data.token;
                const tk: DecodedTokenData | null = parseJwt(tkNoSalt);
                if (tk) {
                    setLoginInfo({
                        accessToken: data.token,
                        name: tk.name,
                        email: tk.email,
                        surname: tk.surname,
                        id: tk.id,
                        profile: tk.admin,
                    })
                }
            }
        }
    }


    api.interceptors.request.use(
        async (config: any) => {
           
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    useEffect(() => {
        getInitialData()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                loginInfo,
                setLoginInfo,
                logout,

            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
