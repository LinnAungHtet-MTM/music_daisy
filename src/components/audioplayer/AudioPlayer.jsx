import React, { useEffect, useRef, useState } from 'react';
import img from '../../assets/Layer 2.png';
import './AudioPlayer.css';
import SongWave from '../songwave/SongWave';
import ReactAudioPlayer from 'react-audio-player';
import { FaPause } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa6";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

const AudioPlayer = ({ currentTrack, tracks, currentIndex, setCurrentIndex, songType }) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [trackProgress, setTrackProgress] = useState(0);

    const currentImage = songType === 'playlist' ? currentTrack?.album?.images[0].url : tracks?.images[0].url;
    const audioSrc = songType === 'playlist' ? tracks[currentIndex]?.track.preview_url : tracks?.tracks.items[currentIndex]?.preview_url;
    const audioRef = useRef(null);

    useEffect(() => {
        const audioElement = audioRef.current.audioEl.current;
        const updateProgress = () => setTrackProgress(audioElement.currentTime);
        audioElement.addEventListener('timeupdate', updateProgress);
        return () => {
            audioElement.removeEventListener('timeupdate', updateProgress);
        };
    }, [currentIndex]);

    const handleNext = () => {
        const trackList = songType === 'playlist' ? tracks : tracks.tracks.items;

        if (currentIndex < trackList.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setIsPlaying(true);
        } else {
            setCurrentIndex(0);
            setIsPlaying(true);
        }
    };

    const handlePrev = () => {
        const trackList = songType === 'playlist' ? tracks : tracks.tracks.items;

        if (currentIndex - 1 < 0) {
            setCurrentIndex(trackList.length - 1);
            setIsPlaying(true);
        } else {
            setCurrentIndex(currentIndex - 1);
            setIsPlaying(true);
        }
    };

    const togglePlayPause = () => {
        const audioElement = audioRef.current.audioEl.current;
        if (isPlaying) {
            audioElement.pause();
        } else {
            audioElement.play();
        }
        setIsPlaying(!isPlaying);
    };

    const addZero = (n) => (n > 9 ? '' + n : '0' + n);

    return (
        <div className='flex justify-center w-full mb-20'>
            <div className='w-[35%] relative'>
                <img src={img} className='absolute max-w-56 top-5 left-5' alt="audio" />
                <img src={currentImage} className='absolute max-w-[62px] top-[88px] left-[88px] rounded-full rotate' alt="audioImg" />
            </div>
            <div className='mt-8 w-[60%] text-center text-warning'>
                <h2 className='text-4xl font-bold mb-4'>{songType === 'playlist' ? currentTrack?.album?.name : currentTrack?.name}</h2>
                <p className='mb-2 font-bold'>{songType === 'playlist' ? currentTrack?.album?.artists[0].name : currentTrack?.artists[0].name}</p>
                <div className='flex justify-center items-center'>
                    <p>0:{addZero(Math.round(trackProgress))}</p>
                    <SongWave isPlaying={isPlaying} />
                    <p>0:30</p>
                </div>
                <div className='custom-audio-player'>
                    <ReactAudioPlayer
                        src={audioSrc}
                        ref={audioRef}
                        autoPlay={isPlaying}
                        controls={false}
                        onEnded={handleNext}
                        onPause={() => setIsPlaying(false)}
                        onPlay={() => setIsPlaying(true)}
                    />
                    <div className='custom-controls'>
                        <button onClick={handlePrev}><AiFillStepBackward /></button>
                        <button onClick={togglePlayPause}>{isPlaying ? <FaPause /> : <FaPlay />}</button>
                        <button onClick={handleNext}><AiFillStepForward /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AudioPlayer