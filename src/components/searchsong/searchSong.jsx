import React, { useRef, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa6";

const SearchSong = ({searchSongs}) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);

    const filterSearchSongs = searchSongs?.filter(song => song.preview_url !== null);

    const audioSrc = filterSearchSongs[currentIndex]?.preview_url;
    const audioRef = useRef();

    const togglePlayPause = (index) => {
        const audioElement = audioRef.current?.audioEl.current;

        if (currentIndex === index) {
            if (isPlaying) {
                audioElement.pause();
                setIsPlaying(false);
            } else {
                audioElement.play();
                setIsPlaying(true);
            }
        } else {
            if (audioRef.current) {
                audioElement.pause();
            }
            setCurrentIndex(index);
            setIsPlaying(true);
        }
    }

  return (
    <div className='mt-5'>
        <h2 className='mb-3 font-bold text-2xl'>Songs</h2>
        <div className='flex flex-wrap gap-4'>
        {filterSearchSongs?.map((song, index) => (
            <div
                onClick={() => togglePlayPause(index)}
                key={song.id}
                className="card bg-card max-w-44 max-h-72 cursor-pointer shadow-xl p-4 transform transition-transform duration-500 hover:scale-105 group">
                <div className='relative'>
                    <img className='rounded-2xl' src={song.album?.images[0].url} alt="" />
                    <div className={`w-10 h-10 absolute bottom-2 right-2 bg-warning text-black rounded-full flex items-center justify-center ${currentIndex === index && isPlaying ? '' : 'opacity-0'} group-hover:opacity-100 transition-opacity duration-500`}>
                        {isPlaying && currentIndex === index ? <FaPause /> : <FaPlay />}
                    </div>
                </div>
                <div className='mt-2'>
                    <p className='font-bold truncate mb-1'>{song.name}</p>
                    <p className='text-sm font-semibold text-gray-300'>{song.artists[0].name}</p>
                </div>
                {currentIndex === index && (
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

export default SearchSong