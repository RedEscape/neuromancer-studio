import React, { useState, useRef, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './Player.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Wave from '@foobar404/wave';
import PrevPlayerBtn from './PrevPlayerBtn';
import PlayAndPausePlayerBtn from './PlayAndPausePlayerBtn';
import NextPlayerBtn from './NextPlayerBtn';
import audios from '../../static/audios';

function Player() {
  const songRef = useRef(null);
  const [wave] = useState(new Wave());
  const [barValue, setBarValue] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [hasChange, setHasChange] = useState(false);
  const currentSong = audios[currentSongIndex];

  useEffect(() => {
    window.document
      .getElementById('audioElement')
      .addEventListener('loadedmetadata', (e) => {
        songRef.current = e.target;
      });
    wave.fromElement('audioElement', 'canvasWaveElement', {
      type: 'wave',
      colors: ['#fff', '#fff'],
      stroke: 0.5,
    });
  }, [wave]);

  const goToNextSong = (value) => {
    const nextSongIndex = currentSongIndex + value;
    const firstSongIndex = 0;
    const lastSongIndex = audios.length - 1;
    if (nextSongIndex >= audios.length) {
      setCurrentSongIndex(firstSongIndex);
    } else if (nextSongIndex < firstSongIndex) {
      setCurrentSongIndex(lastSongIndex);
    } else {
      setCurrentSongIndex(nextSongIndex);
    }
    setHasChange(true);
    setIsPaused(false);
  };

  return (
    <div className="root">
      <div className="playerContainer">
        <div className="coverImgContainer">
          <div
            className={`vinylLikeCover ${!isPaused ? 'animation-spin' : ''}`}
          />
          <div className="vinylBox">
            <LazyLoadImage
              effect="blur"
              placeholderSrc={currentSong.placeholder}
              src={currentSong.img}
              width="350px"
              className={`coverImg ${!isPaused ? 'animation-spin' : ''}`}
            />
          </div>
          <div
            className={`vinylLikeHole ${!isPaused ? 'animation-spin' : ''}`}
          />
        </div>

        <div className="audioInfo">
          <h1>{currentSong.songName}</h1>
          <p>{currentSong.singer}</p>
          <audio
            autoPlay={hasChange}
            onEnded={() => goToNextSong(1)}
            src={currentSong.src}
            id="audioElement"
            onTimeUpdate={() => setBarValue(songRef.current.currentTime)}
          />
        </div>
        <canvas id="canvasWaveElement" />
        <div className="barInputContainer">
          <input
            className="barInput"
            value={barValue}
            onChange={(e) => (songRef.current.currentTime = e.target.value)}
            type="range"
            min={0}
            max={songRef.current?.duration}
          />
        </div>
        <div className="playerControls">
          <PrevPlayerBtn goToNextSong={goToNextSong} />
          <PlayAndPausePlayerBtn
            songRef={songRef}
            isPaused={isPaused}
            setIsPaused={setIsPaused}
          />
          <NextPlayerBtn goToNextSong={goToNextSong} />
        </div>
      </div>
    </div>
  );
}

export default Player;
