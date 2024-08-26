import React, { useEffect, useState } from 'react';
import apiClient from '../../spotify';
import { FaPlay } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Favourite = () => {

  const [savedAlbums, setSavedAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
      const res = await apiClient.get('/me/albums');
        setSavedAlbums(res.data.items);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAlbums();
  }, []);

  const navigate = useNavigate();

  const clickAlbumCard = (id) => {
    navigate('/player', {state : { albumId : id, type : 'album' }});
  };

  return (
    <div className='bg-content w-full h-full text-warning p-4'>
      <h2 className='mb-4 font-bold text-2xl'>Your Albums</h2>
      <div className='flex flex-wrap gap-4'>
      {
        savedAlbums.map(savedAlbum => (
          <div key={savedAlbum?.album.id} onClick={() => clickAlbumCard(savedAlbum?.album.id)}
            className="card bg-card max-w-72 cursor-pointer shadow-xl p-4 transform transition-transform duration-500 hover:scale-105 group">
          <img
            className=' rounded-2xl'
            src={savedAlbum?.album?.images[0].url}
            alt="playlist-photo"/>
        <div className="mt-4 ps-4 flex justify-between items-center">
          <div className='flex-1 min-w-0'>
            <h2 className="card-title mb-2 font-bold truncate">{savedAlbum?.album.name}</h2>
            <p>{savedAlbum?.album.total_tracks} song{savedAlbum?.album.total_tracks > 1 ? 's' : ''}</p>
          </div>
          <div className="w-10 h-10 bg-warning text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <FaPlay/>
          </div>
        </div>
      </div>
        ))
      }
      </div>
    </div>
  )
}

export default Favourite