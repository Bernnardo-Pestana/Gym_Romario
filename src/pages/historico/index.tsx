import { FC, useEffect, useState } from "react"
import Loading from "react-loading"
import TextToSpeech2 from '../components/textSpeach/textSpeach2';
import { GET } from "../../services/api";
import useAuth from "../../hooks/useAuth";

const History: FC<any> = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [history, setHistory] = useState([])
    const { loginInfo } = useAuth()


    const getHistory = async () => {
        try {
            setIsLoading(true)

            const response = await GET(`task-calendar/${loginInfo.id}/history`)

            setHistory(response)

            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getHistory()
    }, [])

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className='container px-8' >
                    <div className='px-8'>
                        <div className=' py-5'>
                            <h3 className='card-title align-items-center d-flex justify-content-between w-100  '>
                                <span className='card-label fw-bolder fs-5 mb-1 text-white'>Exercise History</span>
                            </h3>
                            <span className="text-white">Down here you can see your top 10  booked exercices.</span>
                        </div>
                        <div className='card-body text-white d-flex  flex-column justify-content-center w-md-50 w-100'>
                            {history.map((h: any) => (
                                <div className="d-flex flex-row justify-content-between">
                                    <h4>{h.task}</h4>
                                    <span>{h.count}x</span>
                                </div>
                            ))

                            }
                        </div>
                    </div>
                    <TextToSpeech2 text={'Down here you can see your top 10  booked exercices.'} />
                </div>
            )}
        </>
    )
}

export { History }