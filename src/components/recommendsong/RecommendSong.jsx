import React, { useRef, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa6";

const RecommendSong = ({ recommendSongs,isPlaying,setIsPlaying,currentIndex,audioRef,currentComponent,togglePlayPause }) => {

    // const [isPlaying, setIsPlaying] = useState(false);
    // const [currentIndex, setCurrentIndex] = useState(null);

    // const filterRecommendSongs = recommendSongs.filter(song => song.preview_url !== null).slice(0, 7);
    const audioSrc = recommendSongs[currentIndex]?.preview_url;
    // const audioRef = useRef();

    // const togglePlayPause = (index) => {
    //     const audioElement = audioRef.current?.audioEl.current;

    //     if (currentIndex === index) {
    //         if (isPlaying) {
    //             audioElement.pause();
    //             setIsPlaying(false);
    //         } else {
    //             audioElement.play();
    //             setIsPlaying(true);
    //         }
    //     } else {
    //         if (audioRef.current) {
    //             audioElement.pause();
    //         }
    //         setCurrentIndex(index);
    //         setIsPlaying(true);
    //     }
    // }

    return (
        <div className='mt-5'>
            <h2 className='text-xs font-bold'>Inspired by your recent activity</h2>
            <h2 className='mb-4 font-bold text-2xl'>Recommended For Today</h2>
            <div className='flex flex-wrap gap-4'>
                {recommendSongs?.map((song, index) => (
                    <div
                        onClick={() => togglePlayPause(index, 'Recommend')}
                        key={song.id} 
                        className="card bg-card max-w-44 max-h-72 cursor-pointer shadow-xl p-4 transform transition-transform duration-500 hover:scale-105 group">
                        <div className='relative'>
                            <img className='rounded-2xl' src={song.album?.images[0].url} alt="song-img" />
                            <div className={`w-10 h-10 absolute bottom-2 right-2 bg-warning text-black rounded-full flex items-center justify-center ${(currentIndex === index && isPlaying && currentComponent === 'Recommend') ? '' : 'opacity-0'} group-hover:opacity-100 transition-opacity duration-500`}>
                                {isPlaying && currentIndex === index && currentComponent === 'Recommend' ? <FaPause /> : <FaPlay />}
                            </div>
                        </div>
                        <div className='mt-2'>
                            <p className='font-bold truncate mb-1'>{song.album?.name}</p>
                            <p className='text-sm font-semibold text-gray-300'>{song.artists[0].name}</p>
                        </div>
                        {(currentIndex === index && currentComponent === 'Recommend') && (
                            <ReactAudioPlayer
                                src={audioSrc}
                                ref={audioRef}
                                autoPlay={isPlaying}
                                controls={false}
                                onEnded={() => setIsPlaying(false)}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecommendSong