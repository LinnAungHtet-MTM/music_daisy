import React, { useRef, useState } from 'react'
import RecommendSong from '../recommendsong/RecommendSong'
import RecentSong from '../recentsong/RecentSong'

const FeedSong = ({recommendSongs, recentSongs}) => {

  const filterRecentSongs = recentSongs.filter(song => song.track?.preview_url !== null).slice(0, 7);
  const filterRecommendSongs = recommendSongs.filter(song => song.preview_url !== null).slice(0, 7);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentComponent, setCurrentComponent] = useState(null);

  const audioRef = useRef();

  const togglePlayPause = (index, component) => {
        const audioElement = audioRef.current?.audioEl.current;

        if (currentIndex === index && currentComponent === component) {
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
            setCurrentComponent(component);
        }
    }

  return (
    <div>
        <RecommendSong 
          recommendSongs={filterRecommendSongs}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentIndex={currentIndex}
          audioRef={audioRef}
          currentComponent={currentComponent}
          togglePlayPause={(index, component) => togglePlayPause(index, component)}
        />
        <RecentSong 
          recentSongs={filterRecentSongs}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentIndex={currentIndex}
          audioRef={audioRef}
          currentComponent={currentComponent}
          togglePlayPause={(index, component) => togglePlayPause(index, component)}
        />
    </div>
  )
}

export default FeedSong