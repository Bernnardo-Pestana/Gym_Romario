import { FC, useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"
import { GET, POST } from "../../services/api"
import { Loading } from "../components/Loading/Loading"

import data from '../../mockData/exercices'
import { GymItem } from "../components/gymExercice"
import TextToSpeech2 from '../components/textSpeach/textSpeach2';
import './index.css'


const Exercises: FC<any> = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [exercices, setExercices] = useState<any[]>(data)
    const [daySelected, SetDaySelected] = useState(0)
    const [day, SetDay] = useState<string>('')
    const [unFormatedDay, setUnFormatedDay] = useState<Date>(new Date())

    const [text, setText] = useState<string>('')

    const init = async () => {
        const day = new Date();
        SetDaySelected(day.getDay())


        const split = day.toLocaleString('en-GB').split(',')

        const dateToSpeak = day.toLocaleDateString('en-us', { weekday: "long" })

        SetDay(split[0])

        setText(`Here are the exercises we offer today. Please select the date and the exercises you'd like to book. Day selected: ${dateToSpeak}`)

        await initializeDashboard();
    }

    const initializeDashboard = async () => {
        try {
            setLoading(true)

            

            const exercicesRes = await POST('/tasks/info', { day:  new Date().getDay(), date: unFormatedDay.toISOString() })
            setExercices(exercicesRes)
            setLoading(false)
        } catch (e) {
            setLoading(false)
            console.log(e)
        }
    }

    const daysBefore = async () => {
        const dia = new Date(unFormatedDay);

        const yesterday = new Date(dia.setDate(dia.getDate() - 1))

        SetDaySelected(yesterday.getDay())
        setUnFormatedDay(yesterday)


        const split = yesterday.toLocaleString('en-GB').split(',')

        SetDay(split[0])

        const dateToSpeak = yesterday.toLocaleDateString('en-us', { weekday: "long" })

        setText(`Day selected: ${dateToSpeak}`)

        setLoading(true)
        const exercicesRes = await POST('/tasks/info', { day: yesterday.getDay(), date: yesterday.toISOString() })
        setExercices(exercicesRes)
        setLoading(false)
    }

    const daysAfter = async () => {
        const dia = new Date(unFormatedDay);

        const tomorrow = new Date(dia.setDate(dia.getDate() + 1))

        SetDaySelected(tomorrow.getDay())
        setUnFormatedDay(tomorrow)


        const split = tomorrow.toLocaleString('en-GB').split(',')

        SetDay(split[0])


        const dateToSpeak = tomorrow.toLocaleDateString('en-us', { weekday: "long" })
        setText(`Day selected: ${dateToSpeak}`)

        setLoading(true)
        const exercicesRes = await POST('/tasks/info', { day: tomorrow.getDay(), date: tomorrow.toISOString() })
        setExercices(exercicesRes)
        setLoading(false)
    }


    useEffect(() => {
        init();
    }, [])

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className='container px-8' >
                    <div className='px-8'>
                        <div className=' py-5'>
                            <h3 className='card-title align-items-center d-flex justify-content-between w-100  '>
                                <span className='card-label fw-bolder fs-5 mb-1 text-white'>Welcome to your smart Gym</span>
                            </h3>
                            <span className="text-white">Here are the exercises we offer today. Please select the date and the exercises you'd like to book.</span>
                        </div>
                        <div className='card-body text-white d-flex justify-content-center'>
                            {exercices &&
                                <div className='d-flex flex-column justify-content-between exercice'>
                                    <div className="d-flex justify-content-between align-items-center">

                                        <span><i className="bi bi-caret-left-square fs-1 " onClick={() => daysBefore()}></i></span>
                                        <span className="fs-2 fw-bold">
                                            {day}
                                        </span>

                                        <span> <i className="bi bi-caret-right-square fs-1" onClick={() => daysAfter()}></i></span>
                                    </div>
                                    <div className="overflow-y-scroll p-4 border rounded exerciceContainer">
                                        {exercices.map((ex: any) => (
                                            <GymItem item={ex} day={unFormatedDay} />
                                        ))
                                        }
                                    </div>


                                </div>
                            }


                        </div>
                    </div>
                    <TextToSpeech2 text={text} />
                </div>
            )}
        </>
    )
}

export { Exercises }