import React, { useRef, useState } from "react";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import { makeStyles } from "@material-ui/core/styles";
import "../stylesheets/App.scss";

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingTop: "25%",
  },
}));

export default function Visual({
  frequencyBandArray,
  getFrequencyData,
  // initializeAudioAnalyser,
  audioData,
}) {
  const classes = useStyles();

  const amplitudeValues = useRef(null);

  const [start, setStart] = useState(false);

  function adjustFreqBandStyle(newAmplitudeData) {
    amplitudeValues.current = newAmplitudeData;
    let domElements = frequencyBandArray.map((num) =>
      document.getElementById(num)
    );
    for (let i = 0; i < frequencyBandArray.length; i++) {
      let num = frequencyBandArray[i];
      domElements[
        num
      ].style.backgroundColor = `rgb(0, 255, ${amplitudeValues.current[num]})`;
      domElements[num].style.height = `${amplitudeValues.current[num]}px`;
    }
  }

  function runSpectrum() {
    getFrequencyData(adjustFreqBandStyle);
    requestAnimationFrame(runSpectrum);
  }

  function handleStartBottonClick() {
    console.log("click button.....");

    if (!start) {
      setStart(true);
      // initializeAudioAnalyser();
      requestAnimationFrame(runSpectrum);
    } else {
      setStart(false);
      window.location.reload(false);
    }
  }

  return (
    <div>
      <div>
        <Tooltip title="Start" aria-label="Start" placement="right">
          <IconButton
            id="startButton"
            onClick={() => handleStartBottonClick()}
            disabled={!!audioData ? false : true}
            color={start ? "secondary" : "primary"}
          >
            <EqualizerIcon />
          </IconButton>
        </Tooltip>
      </div>

      <div className={classes.flexContainer}>
        {frequencyBandArray.map((num) => (
          <Paper
            className={"frequencyBands"}
            elevation={4}
            id={num}
            key={num}
          />
        ))}
      </div>
    </div>
  );
}
