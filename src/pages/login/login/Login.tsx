import { FC } from "react"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button/Button'
import { Input } from '../../components/Input/Input'
//import { DecodedTokenData } from '../../../../context/authContext'
import useAuth from '../../../hooks/useAuth'
import { POST, setBearerToken, setBearerTokenAdm } from '../../../services/api'
import { parseJwt } from '../../utils/utils'
import { isEmail, isEmpty } from '../../utils/validate'
import './Login.css'



const Login: FC<any> = () => {

    const navigate = useNavigate()
    const { setLoginInfo } = useAuth()

    const [loading, setLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isInvalid, setIsInvalid] = useState<boolean>(false)
    const [invalidText, setInvalidText] = useState<string>('')

    const handleLogin = async () => {
        const validate = isEmpty({ email, password })
        const emailValidate = isEmail(email)
        if (validate && emailValidate) {
            setLoading(true)
            setIsSubmitting(true)
            try {
                const response = await POST('/auth', { email, password })

                await setBearerToken(response.token)
                await setBearerTokenAdm(response.token)
                localStorage.setItem('loginInfo', JSON.stringify(response))
                localStorage.setItem('settings','')
                if (response) {
                    const tkNoSalt = response.token
                    const tk: any | null = parseJwt(tkNoSalt)
                    if (tk) {
                        setLoginInfo({
                            accessToken: response.token,
                            name: tk.name,
                            email: tk.email,
                            surname: tk.surname,
                            id: tk.id,
                            profile: tk.admin,
                        })
                        navigate('/dashboard')
                    }
                }
            } catch (e) {
                console.log('Error', e)
                let text = 'Ocorreu um erro durante o login. Tente novamente!'
                if (e === 'User not found.') text = 'Usuário não encontrado!'
                setInvalidText(text)
                setIsInvalid(true)
            }
            setIsSubmitting(false)
            setLoading(false)
        } else {
            let text = ''
            if (!validate) text = 'Todos os campos devem estar preenchidos!'
            else if (!emailValidate) text = 'Por favor, digite um email válido!'
            setInvalidText(text)
            setIsInvalid(true)
        }
    }

    return (

        <div className="d-flex  flex-column flex-md-row align-items-center justify-content-between " style={{
            background: '#000083',
            border: '1px solid #FFF',
        }}>
            <div className="bg-danger d-lg-block arrow-left d-none" style={{
                
            }}>

            </div>
            <section className='form w-sm-75  w-100 flex ms-5 p-4 ' style={{

            }}>
                <div className='fv-row mb-10 w-75 text-white'>
                    <Input
                        inputAttr={{
                            type: 'email',
                        }}
                        label='E-mail'
                        placeholder='Enter E-mail'
                        value={email}
                        change={setEmail}
                    />
                </div>

                <div className='fv-row mb-10  w-75 text-white'>
                    <Input
                        inputAttr={{
                            type: 'password',
                        }}
                        label='Password'
                        placeholder='Enter Password'
                        value={password}
                        change={setPassword}
                        autoComplete='new-password'
                    />

                </div>
                <div className='mt-2 w-75'>
                    <div className='w-100'>
                        <Button
                            loading={loading}
                            disabled={isSubmitting}
                            color='light'
                            outline
                            width="100"
                            text='Login'
                            btnAttr={{
                                type: 'button',
                            }}
                            click={() => handleLogin()}
                        />
                    </div>
                </div>
                <div className="mt-1 text-white d-flex justify-content-between w-75 w-md-100">
                    <div>
                        <input type="checkbox" className="mx-1" />
                        <label>Remember me</label>
                    </div>
                    <a onClick={() => navigate('/auth/new-password')}><span>forgot</span> <span className="fw-bold text-primary me-2"> Password</span></a>
                </div>
                <div className='d-flex flex-column-reverse flex-md-row  align-items-center align-items-md-center justify-content-md-between  justify-content-center w-75 my-2'>
                    <Button
                        disabled={isSubmitting}
                        text='Cancel'
                        color='danger'

                        btnAttr={{
                            type: 'button',
                        }}
                        click={() => navigate('/auth/new')}
                        btnClass='rounded my-2'

                    />
                    <Button
                        disabled={isSubmitting}
                        text='SIGN UP'
                        color='light'
                        outline
                        btnAttr={{
                            type: 'button',
                        }}
                        click={() => navigate('/auth/new')}
                        btnClass='rounded'

                    />
                </div>
            </section>
        </div>
    )
}


export { Login }