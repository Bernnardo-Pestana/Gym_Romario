import React, { useState, useEffect, FC } from "react";




const TextToSpeech: FC<any> = ({ text }) => {
    const [isPaused, setIsPaused] = useState(false);

    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance>();

    useEffect(() => {

        const synth = window.speechSynthesis;

        const u = new SpeechSynthesisUtterance(text);


        setUtterance(u);


        if (isPaused) {
            synth.resume();
        }

        synth.speak(new SpeechSynthesisUtterance(text));

        return () => {

            //synth.cancel();

        };

    }, [text]);

    return (
        <>
        </>
    )
}


export { TextToSpeech };