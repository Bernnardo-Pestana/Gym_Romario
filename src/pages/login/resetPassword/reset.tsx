import { FC } from "react"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button/Button'
import { Input } from '../../components/Input/Input'

import useAuth from '../../../hooks/useAuth'
import { POST } from '../../../services/api'

import { isEmail, isEmpty } from '../../utils/validate'
import '../login/Login.css'

const Reset: FC<any> = () => {

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
                const response = await POST('/auth/new-password', { email, password })
                if (response) {
                    navigate('/auth')
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

        <div className="d-flex  flex-column flex-md-row align-items-center justify-content-between pt-4 " style={{
            background: '#000083',
            border: '1px solid #FFF',
        }}>
            <div className="bg-danger d-lg-block  arrow-left d-none">

            </div>

            <section className='form w-sm-75  w-100 flex ms-5 p-1'>
                <div className='fv-row mb-10 w-75 text-white'>
                    <Input
                        inputAttr={{
                            type: 'email',
                        }}
                        label='E-mail'
                        placeholder='E-mail'
                        value={email}
                        change={setEmail}
                    />
                </div>

                <div className='fv-row mb-10 w-75 text-white'>
                    <Input
                        inputAttr={{
                            type: 'password',
                        }}
                        label='New Password'
                        placeholder='New Password'
                        value={password}
                        change={setPassword}
                        autoComplete='new-password'
                    />

                </div>

                <div className='d-flex flex-column-reverse flex-md-row  align-items-center align-items-md-center justify-content-md-between  justify-content-center mt-5'>
                    <div className='w-md-50 w-100  my-2'>

                        <Button
                            disabled={isSubmitting}
                            color='secondary'
                            text='Back'
                            btnAttr={{
                                type: 'button',
                            }}

                            click={() => navigate('/auth')}
                            btnClass='w-75 w-md-50'
                        />

                    </div>
                    <div className='w-md-50 w-100  mx-md-1 my-2'>

                        <Button
                            loading={loading}
                            disabled={isSubmitting}
                            color='primary'
                            text='Save'
                            btnAttr={{
                                type: 'button',
                            }}
                            click={() => handleLogin()}
                            btnClass='w-75 w-md-50'
                        />

                    </div>
                </div>
            </section>
        </div>
    )
}


export { Reset }