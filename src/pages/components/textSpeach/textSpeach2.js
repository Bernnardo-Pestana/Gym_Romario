import React, {
  useState,
  useEffect
} from "react";

const TextToSpeech = ({
  text
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

  

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    } else {
      const hasSetting = localStorage.getItem('settings')
      const settings = hasSetting ? JSON.parse(hasSetting) : undefined;

      const u = new SpeechSynthesisUtterance(text)

      if (synth && settings) {

        const voices = window.speechSynthesis.getVoices()
        const voice = voices.find((v) => v.name === settings.voiceSelected)

        u.voice = voice;
        u.pitch = settings.pitch;
        u.rate = settings.rate;
        u.volume = settings.volume;

      }

      synth.speak(u);
    }



    setIsPaused(true);
  };

  useEffect(() => {
    handlePlay()
  }, text)

  return ( <>
    {
      /*
         
          <div>
            <button onClick={handlePlay}>{isPaused ? "Resume" : "Play"}</button>
            <button onClick={handlePause}>Pause</button>
            <button onClick={handleStop}>Stop</button>
          </div>
         */

    } </>

  );
};

export default TextToSpeech;