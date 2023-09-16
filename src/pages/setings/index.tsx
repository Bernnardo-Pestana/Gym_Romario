import { FC, useEffect, useState } from "react"
import { Input } from "../components/Input/Input"
import { useNavigate } from "react-router-dom";


const Setting: FC<any> = () => {
    const [voice, setVoice] = useState<SpeechSynthesisVoice | null>();
    const [voiceSelected, setVoiceSelected] = useState<SpeechSynthesisVoice | null>();

    const navigate = useNavigate()

    const [pitch, setPitch] = useState(1);

    const [rate, setRate] = useState(1);

    const [volume, setVolume] = useState(1);
    const [isPaused, setIsPaused] = useState(false);

    const [voicesOptions, setVoicesOptions] = useState<any>([])
    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance>();


    const init = () => {

        const options = window.speechSynthesis.getVoices().map((voice) => {
            return {
                select: voice.name,
                value: voice.name
            }
        })
        setVoicesOptions(options)


    }

    const saveSettings = () => {
        const obj = {
            pitch,
            rate,
            volume,
            voiceSelected
        }

        localStorage.setItem('settings', JSON.stringify(obj))

        navigate('/dashboard')
    }

    useEffect(() => {

        init()

    }, [])

    useEffect(() => {
        const synth = window.speechSynthesis;
        const u = new SpeechSynthesisUtterance('Welcome to your setting device, here you can configure the voice assistance, whith options like: Pitch, volume, Rate and Voice.');
        setUtterance(u);

        // Add an event listener to the speechSynthesis object to listen for the voiceschanged event
        synth.addEventListener("voiceschanged", () => {
            const voices = synth.getVoices();
            setVoice(voices[0]);
        });

        return () => {
            synth.cancel();
            synth.removeEventListener("voiceschanged", () => {
                setVoice(null);
            });
        };
    }, []);

    const handlePlay = () => {
        const synth = window.speechSynthesis;

        if (isPaused) {
            synth.resume();
        } else {
            if (utterance) {
                utterance.voice = voice!;
                utterance.pitch = pitch;
                utterance.rate = rate;
                utterance.volume = volume;
                synth.speak(utterance);
            }
        }

        setIsPaused(false);
    };



    return (
        <>
            <div className={''} >
                <div className={''}>
                    <div className='modal-header p-3'>
                        <h5 className='modal-title text-primary'>Voice Settings</h5>
                    </div>
                    <div className='modal-body text-break pt-0 p-4'>
                        <div>
                            <span className="text-white">Here you can configure your device.</span>
                        </div>

                        <div>
                            <Input
                                inputAttr={{
                                    type: 'range',
                                }}
                                placeholder='Speach Pitch'
                                label='Speach Pitch'
                                value={pitch}
                                change={(value: any) => setPitch(value)}
                            />

                            <Input
                                inputAttr={{
                                    type: 'range',
                                }}
                                placeholder='Speach Rate'
                                label='Speach Rate'
                                value={rate || ''}
                                change={(value: any) => setRate(value)}
                            />

                            <Input
                                inputAttr={{
                                    type: 'range',
                                }}
                                placeholder='Speach Volume'
                                label='Speach Volume'
                                value={volume || ''}
                                change={(value: any) => setVolume(value)}
                            />

                            <Input
                                inputAttr={{
                                    type: 'select',
                                }}
                                label='Speach Voice'
                                options={voicesOptions}
                                value={voiceSelected || ''}
                                change={(value: any) => {
                                    const voices = window.speechSynthesis.getVoices();
                                    setVoice(voices.find((v: any) => v.name === value))
                                    setVoiceSelected(value)
                                }

                                }
                            />
                        </div>


                    </div>
                    <div className='modal-footer d-flex align-items-center justify-content-center mt-4'>
                        <button
                            type='button'
                            className='btn btn-primary me-3'
                            onClick={() => {
                                saveSettings()
                            }}
                        >
                            Confirm
                        </button>


                        <button
                            type='button'
                            className='btn btn-secondary me-3'
                            onClick={() => {
                                handlePlay()
                            }}
                        >
                            Try Voice
                        </button>
                        {/*isErro && (
                            <div className="d-flex justify-content-center p-3 mx-3">
                                <span className="text-danger">  {isErro}</span>
                            </div>
                        )

                        */ }
                    </div>
                </div>
            </div>
        </>
    )
}

export { Setting }