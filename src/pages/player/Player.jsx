import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import apiClient from '../../spotify';
import SongCard from '../../components/songcard/SongCard';
import SongList from '../../components/songlist/SongList';
import AudioPlayer from '../../components/audioplayer/AudioPlayer';
import Widget from '../../components/widget/Widget';

const Player = () => {

  const location = useLocation();

  const playlistId = location.state?.playlistId;
  const albumId = location.state?.albumId;
  const songType = location.state.type;

  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [albums, setAlbums] = useState(null);
  const [currentAlbum, setCurrentAlbum] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      if (playlistId && songType === 'playlist') {
        try {
          const res = await apiClient.get(`playlists/${playlistId}/tracks`);
          setTracks(res.data?.items);
          setCurrentTrack(res.data?.items[0]?.track);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchPlaylist();
  }, [playlistId, songType]);

  useEffect(() => {
    const fetchAlbum = async () => {
      if (albumId && songType === 'album') {
        try {
        const res = await apiClient.get(`/albums/${albumId}`);
        setAlbums(res.data);
        setCurrentAlbum(res.data?.tracks.items[0]);
        } catch (err) {
          console.log(err);
        }
      }
    }
    fetchAlbum();
  }, [albumId, songType]);

  useEffect(() => {
    if (playlistId && songType === 'playlist') {
      setCurrentTrack(tracks[currentIndex]?.track);
    }else {
      setCurrentAlbum(albums?.tracks.items[currentIndex]);
    }
  }, [currentIndex, tracks, albums]);

  return (
    <>
      <div className="flex flex-wrap justify-between w-full h-screen bg-content p-5">
        <div className="w-full md:max-w-[74%]">
          <div className="bg-card text-slate-900 p-4 h-full rounded-2xl">
            {
              songType === 'playlist' ?
              <AudioPlayer
              currentTrack={currentTrack}
              tracks={tracks}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              songType={songType}
            /> :
            <AudioPlayer
              currentTrack={currentAlbum}
              tracks={albums}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              songType={songType}
            />
            }

            {
              songType === 'playlist' ? 
              <Widget currentTrack={currentTrack} type={songType}/> :
              <Widget currentTrack={currentAlbum} type={songType}/>
            }
          </div>
        </div>

        <div className="w-full md:max-w-[25%] flex flex-col space-y-4">
          <div className="bg-card p-4 flex-1 rounded-2xl">
            {
              songType === 'playlist' ?
              <SongCard album={currentTrack?.album} type={songType}/> :
              <SongCard album={albums} type={songType}/>
            }
          </div>
          <div>
            {
              songType === 'playlist' ?
            <SongList 
              tracks={tracks} 
              setCurrentIndex={setCurrentIndex} 
              currentTrack={currentTrack} 
              songType={songType}/> 
              :
            <SongList 
              tracks={albums} 
              setCurrentIndex={setCurrentIndex} 
              currentTrack={currentAlbum} 
              songType={songType}/>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Player