import React from 'react';
import './SongWave.css';

const SongWave = ({isPlaying}) => {

    const waveClass = isPlaying ? "box isActive" : "box";

  return (
    <div className="box-container mx-4 flex">
      <div className={`${waveClass} box1`}></div>
      <div className={`${waveClass} box2`}></div>
      <div className={`${waveClass} box3`}></div>
      <div className={`${waveClass} box4`}></div>
      <div className={`${waveClass} box5`}></div>
      <div className={`${waveClass} box6`}></div>
      <div className={`${waveClass} box7`}></div>
      <div className={`${waveClass} box2`}></div>
      <div className={`${waveClass} box3`}></div>
      <div className={`${waveClass} box4`}></div>
      <div className={`${waveClass} box5`}></div>
      <div className={`${waveClass} box6`}></div>
      <div className={`${waveClass} box7`}></div>
    </div>
  )
}

export default SongWave