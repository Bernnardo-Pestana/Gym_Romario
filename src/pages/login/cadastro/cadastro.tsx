import { FC } from "react"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button/Button'
import { Input } from '../../components/Input/Input'
//import { DecodedTokenData } from '../../../../context/authContext'
//import useAuth from '../../../../hooks/useAuth'
import { POST, setBearerToken, setBearerTokenAdm } from '../../../services/api'
import { parseJwt } from '../../utils/utils'
import { isEmail, isEmpty } from '../../utils/validate'
import Swal from 'sweetalert2'



const Cadastro: FC<any> = () => {

    const navigate = useNavigate()
    //const { setLoginInfo } = useAuth()

    const [loading, setLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [email, setEmail] = useState<string>('')

    const [addressLine1, setAddressLine1] = useState<string>('')
    const [addressLine2, setAddressLine2] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [postCode, setPostCode] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const [name, setName] = useState<string>('')
    const [surname, setSurname] = useState<string>('')
    const [age, setAge] = useState<string>('')

    const [isInvalid, setIsInvalid] = useState<boolean>(false)
    const [invalidText, setInvalidText] = useState<string>('')


    const createUser = async () => {

        if (!name || !surname || !password || !age || !email || !postCode || !city || !addressLine2 || !addressLine1) {
            Swal.fire({
                title: 'Error!',
                text: 'Please review the form and submit again.',
                icon: 'warning',
            })
            return
        } else {
            try {
                setLoading(true)

                const response = await POST('/users/create', {
                    "name": name,
                    "surname": surname,
                    "birthdate": age,
                    "email": email,
                    "password": password,
                    "addressLine1": addressLine1,
                    "addressLine2": addressLine2,
                    "city": city,
                    "postCode": postCode,
                    "profilePic":"a"
                })


                setLoading(false)
                Swal.fire({
                    title: 'Success!',
                    text: 'Account has been created',
                    icon: 'success'
                }).then(() => { navigate('/auth') })



            } catch (error) {
                console.log(error)

                Swal.fire({
                    title: 'Warning!',
                    text: 'Some error ocurred while creating account, try again next time',
                    icon: 'warning'
                })
                setLoading(false)
            }
        }


    }




    return (
        <div className="d-flex justify-content-between align-items-center w-100 w-75 " >
            <div className='d-flex justify-content-between  align-items-center w-100'>
                <div className='card  w-100 mt-5'>
                    <div className='card-header w-100 bg-dark'>
                        <h3 className='card-title align-items-start flex-column'>
                            <span className='card-label fw-bold fs-4 mb-1 text-md-start text-white '>SIGN UP!</span>
                        </h3>
                    </div>

                    <div className='card-body px-10 py-5 px-5 bg-dark text-white'>
                        <section className='form justify-content-center'>
                            <div>
                                <div className='fv-row mb-10'>
                                    <Input
                                        inputAttr={{
                                            type: 'default',
                                        }}
                                        label='Name'
                                        placeholder='Name'
                                        value={name}
                                        change={setName}
                                    />
                                </div>

                                <div className='fv-row mb-10 mt-2'>
                                    <Input
                                        inputAttr={{
                                            type: 'default',
                                        }}
                                        label='Surname'
                                        placeholder='Surname'
                                        value={surname}
                                        change={setSurname}
                                    />

                                </div>
                            </div>

                            <div className='fv-row my-5 mt-2 d-flex'>
                                <Input
                                    inputAttr={{
                                        type: 'date',
                                    }}
                                    className="bg-white text-secondary"
                                    label='Birth Date'
                                    placeholder='Birth Date'
                                    value={age}
                                    change={setAge}
                                />

                            </div>

                            <div className='my-5 mt-2 d-flex flex-column flex-md-row justify-content-between' >
                                <div className='d-flex flex-column w-md-50 w-100 mx-md-1'>
                                    <div className='fv-row mb-10 '>
                                        <Input
                                            inputAttr={{
                                                type: 'default',
                                            }}
                                            label='Address Line 1'
                                            placeholder='Address Line 1'
                                            value={addressLine1}
                                            change={setAddressLine1}
                                        />
                                    </div>

                                    <div className='fv-row mb-10 mt-2'>
                                        <Input
                                            inputAttr={{
                                                type: 'default',
                                            }}
                                            label='Address Line 2'
                                            placeholder='Address Line 2'
                                            value={addressLine2}
                                            change={setAddressLine2}
                                        />

                                    </div>
                                </div>
                                <div className="d-flex flex-column w-md-50 w-100 mx-md-1">
                                    <div className='fv-row mb-10   '>
                                        <Input
                                            inputAttr={{
                                                type: 'default',
                                            }}
                                            label='City'
                                            placeholder='City'
                                            value={city}
                                            change={setCity}
                                        />
                                    </div>

                                    <div className='fv-row mb-10 mt-2'>
                                        <Input
                                            inputAttr={{
                                                type: 'default',
                                            }}
                                            label='PostCode'
                                            placeholder='PostCode'
                                            value={postCode}
                                            change={setPostCode}
                                        />

                                    </div>
                                </div>

                            </div>


                            <div className='mt-2'>
                                <div className='fv-row mb-10  w-100 mt-2'>
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

                                <div className='fv-row mb-10 mt-2'>
                                    <Input
                                        inputAttr={{
                                            type: 'password',
                                        }}
                                        label='Password'
                                        placeholder='Password'
                                        value={password}
                                        change={setPassword}
                                        autoComplete='new-password'
                                    />

                                </div>
                            </div>

                            <div>
                                <div className='d-flex flex-column-reverse flex-md-row  align-items-center align-items-md-center justify-content-md-between  justify-content-center mt-5'>

                                    <div className='text-center text-md-end  w-md-50 w-100  my-2 mx-md-1'>
                                        <Button
                                            loading={loading}
                                            disabled={isSubmitting}
                                            color='secondary'
                                            text='Back'
                                            btnAttr={{
                                                type: 'button',
                                            }}

                                            click={() => navigate('/auth')}
                                            btnClass='w-100 w-md-50'
                                        />

                                    </div>

                                    <div className='text-center text-md-start   w-md-50 w-100 ml-5 mx-md-1'>
                                        <Button
                                            loading={loading}
                                            disabled={isSubmitting}
                                            color='primary'
                                            text='Create'
                                            btnAttr={{
                                                type: 'button',
                                            }}
                                            click={() => createUser()}
                                            btnClass='w-100 w-md-50'
                                        />

                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </div>


        </div>

    )
}


export { Cadastro }