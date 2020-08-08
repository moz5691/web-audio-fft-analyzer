import React, { useState } from "react";
import Visual from "./Visual";
import GummyBearz from "../audio/GummyBearz.mp3";
import SweetDreams from "../audio/SweetDreams.mp3";
import Mozart from "../audio/ml_mozart_2.mp3";
import Beethoven from "../audio/ml_beethoven_01.mp3";

import Button from "@material-ui/core/Button";

export default function AudioDataContainer() {
  const [audioData, setAudioData] = useState();
  const frequencyBandArray = [...Array(25).keys()];

  const initializeAudioAnalyser = (musicFile) => {
    const audioFile = new Audio();
    const audioContext = new AudioContext();
    const source = audioContext.createMediaElementSource(audioFile);
    const analyser = audioContext.createAnalyser();
    audioFile.src = musicFile;
    analyser.fftSize = 64;
    source.connect(audioContext.destination);
    source.connect(analyser);
    audioFile.play();
    setAudioData(analyser);
  };

  const getFrequencyData = (styleAdjuster) => {
    console.log("styledAdjuster", styleAdjuster);
    console.log("audioData", audioData);
    const bufferLength = audioData.frequencyBinCount;
    const amplitudeArray = new Uint8Array(bufferLength);
    audioData.getByteFrequencyData(amplitudeArray);
    styleAdjuster(amplitudeArray);
  };

  return (
    <div>
      <div style={{ textAlign: "center", margin: "20px", padding: "10px" }}>
        <Button
          variant="contained"
          onClick={() => initializeAudioAnalyser(GummyBearz)}
        >
          GummyBearz
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => initializeAudioAnalyser(SweetDreams)}
        >
          SweetDreams
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => initializeAudioAnalyser(Mozart)}
        >
          Mozart
        </Button>
        <Button
          variant="contained"
          color="red"
          onClick={() => initializeAudioAnalyser(Beethoven)}
        >
          Beethoven
        </Button>
      </div>

      <div style={{ margin: "40px" }}>
        <Visual
          // initializeAudioAnalyser={initializeAudioAnalyser}
          frequencyBandArray={frequencyBandArray}
          getFrequencyData={getFrequencyData}
          audioData={audioData}
        />
      </div>
    </div>
  );
}
