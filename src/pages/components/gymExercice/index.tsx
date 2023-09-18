import { FC, useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { POST } from "../../../services/api"
import styles from './ModalWrapper.module.css'
import { Input } from "../Input/Input"
import Spinner from 'react-bootstrap/Spinner';
import TextToSpeech2 from '../textSpeach/textSpeach2';


const GymItem: FC<any> = ({ item, day }) => {

    const [open, setOpen] = useState<boolean>(false)
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [date, setDate] = useState<Date>(day)
    const [hour, setHour] = useState<string>('12:00')
    const [spot, setSpot] = useState<string>('A1')
    const [isErro, setisErro] = useState<string>('')
    const [text, setText] = useState<string>('')
    const [width, setWidth] = useState<number>(0)

    const [spots, setSpots] = useState<any[]>([
        { select: "A1", value: "A1" },
        { select: "A2", value: "A2" },
        { select: "A3", value: "A3" },
        { select: "A4", value: "A4" },
        { select: "A5", value: "A5" },
        { select: "A6", value: "A6" },
        { select: "A7", value: "A7" },
        { select: "A8", value: "A8" },
        { select: "A9", value: "A9" },
        { select: "A10", value: "A10" }
    ]
    )

    const book = async () => {
        try {
            setIsLoading(true)
            const response = await POST('/task-calendar', {
                "taskid": item.taskid,
                "day": day.toISOString().split('T')[0]
            })

            if (response) {
                setModalOpen(true)
            }
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    const bookParkingSpot = async () => {

        if (!date || !hour) {
            setisErro('Select a Date or Hour')
        } else {
            try {
                setIsLoading(true)
                const response = await POST('/parking', {
                    "slot": spot,
                    "day": date,
                    'hour': hour
                })

                if (response) {
                    setModalOpen(false)
                    setisErro('')
                    setDate(new Date())
                    setHour('12:00')
                }
                setIsLoading(false)
            } catch (error: any) {
                setisErro(error.data.message)
                setIsLoading(false)
            }
        }



    }

    const closeWrapperModal = () => {
        setModalOpen(false)
    }

    const playExercice = (value: boolean) => {

        if (value) {
            setText(`Exercice selected: ${item.title}. Details: ${item.description}. Instructor: ${item.instructor}.`)
        } else {
            setText('')
        }

    }


    useEffect(() => {
        /* Inside of a "useEffect" hook add an event listener that updates
           the "width" state variable when the window size changes */
        window.addEventListener("resize", () => setWidth(window.innerWidth));

        /* passing an empty array as the dependencies of the effect will cause this
           effect to only run when the component mounts, and not each time it updates.
           We only want the listener to be added once */
    }, []);

    return (
        <>
            <div className="bg-secondary my-2 rounded card" >
                <div className="d-flex justify-content-md-between justify-content-evenly card-header" onClick={() => {
                    setOpen(!open)

                    playExercice(!open)

                }}>
                    <span className=" text-white fw-semibold">{item.title}</span>
                    <span className=" text-white fw-semibold">{item.hour}</span>

                </div>
                {open && (
                    <div className="card-body d-flex flex-column">
                        <div className="d-flex flex-column px-1">
                            <div className="mt-1">
                                <span className=" text-white fw-light">{item.description}</span>
                            </div>
                            <div className="my-2">
                                <span className=" text-white fw-semibold ">Instructor: {item.instructor} </span>
                            </div>

                        </div>

                        <div className="w-100 d-flex justify-content-evenly mt-3">
                            <button className="btn btn-warning btn-sm" onClick={() => book()}>Booking</button>
                        </div>
                        <TextToSpeech2 text={text} />
                    </div>
                )

                }
                <div className="d-flex justify-content-between me-1 card-footer">
                    <span className=" text-white fw-lighter">Limit</span>
                    <span className=" text-white fw-lighter">{item.limit - item.remaining} / {item.limit}</span>
                </div>
            </div>


            {modalOpen && (
                <>
                    <div className={styles.background}></div>
                    <div className={`${styles.modalCustom} `} style={{ width: width > 650? '30%' : "80%" }} >
                        <div className={`${styles.modalContent} `} style={{ height: width > 650?  '47vh' :  '67vh' }}>
                            <div className='modal-header p-3'>
                                <h5 className='modal-title text-primary'>Parking Spot</h5>
                                <div
                                    className='btn btn-icon btn-sm btn-active-light-primary ms-2'
                                    onClick={() => closeWrapperModal()}
                                >
                                    <i className="fa fa-times" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div className='modal-body text-break pt-0 p-4'>
                                <div>
                                    <span>Would you like to book a parking spot for this class? If yes, select the spot the date and the hours and click on <b>Confirm</b></span>
                                </div>

                                <div>
                                    <Input
                                        inputAttr={{
                                            type: 'date',
                                        }}
                                        placeholder='Day of Parking Spot'
                                        label='Booking date'
                                        value={date}
                                        change={(value: any) => setDate(value)}
                                    />

                                    <Input
                                        inputAttr={{
                                            type: 'time',
                                        }}
                                        placeholder='Parking Spot Hour'
                                        label='Booking Hour'
                                        value={hour || ''}
                                        change={(value: string) => setHour(value)}
                                    />
                                    <Input
                                        inputAttr={{
                                            type: 'select',
                                        }}
                                        label='Parking Spot'
                                        options={spots}
                                        value={spot || ''}
                                        change={(value: any) =>
                                            setSpot(value)
                                        }
                                    />
                                </div>


                            </div>
                            <div className='modal-footer d-flex align-items-center justify-content-center mt-4'>
                                <button
                                    type='button'
                                    className='btn btn-primary me-3'
                                    onClick={() => {
                                        bookParkingSpot()
                                    }}
                                >
                                    Confirm
                                </button>
                                <button
                                    type='button'
                                    className='btn btn-light ms-3'
                                    onClick={() => closeWrapperModal()}
                                >
                                    Close
                                </button>

                                {isErro && (
                                    <div className="d-flex justify-content-center p-3 mx-3">
                                        <span className="text-danger">  {isErro}</span>
                                    </div>
                                )

                                }
                            </div>
                            <TextToSpeech2 text={'>Would you like to book a parking spot for this class? If yes, select the spot the date and the hours and click on Confirm'} />
                        </div>
                    </div>
                </>
            )
            }

            {isLoading && (
                <>
                    <div className={styles.background}></div>
                    <div className={`${styles.modalCustomLoading} `} style={{ width: '100%' }} >
                        <div className="pinner-border text-primary d-flex justify-content-center align-items-center" style={{ height: '100vh' }} role="status">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    </div>
                </>
            )

            }
        </>
    )
}

export { GymItem }