import { FC, useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"
import { GET, POST } from "../../services/api"
import { Loading } from "../components/Loading/Loading"

import data from '../../mockData/exercices'
import { GymItem } from "../components/gymExercice"
import './index.css'
import { TextToSpeech } from "../components/textSpeach/textSpeach"
import TextToSpeech2 from '../components/textSpeach/textSpeach2';


const Dashboard: FC<any> = () => {

    const navigate = useNavigate()
    const [initText, setInitText] = useState('Welcome to AdaptActive, here you can schedule your activities, if you need any help, please contact one of our staff members')

    const init = () => {
        //setInitText('Hello my friend')
    }


    useEffect(() => {
        init()
    },)


    return (

        <>
            <div className='d-flex flex-column align-items-center p-5'>
                <div className="alters  d-flex flex-column justify-content-center align-items-center " onClick={() => navigate('/exercises')
                }>
                    <div className="h-25" >
                        <span className="text-danger text h3" >schedule </span>
                        <span className="text-primary text h3 ">activities </span>
                    </div>
                    <i className="bi bi-plus-circle-dotted h1 text-primary h-25"></i>
                </div>
            </div>
            <TextToSpeech2 text={initText} />
        </>

    )
}

export { Dashboard }