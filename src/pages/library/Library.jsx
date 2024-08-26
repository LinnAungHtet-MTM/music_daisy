import { useEffect, useState } from 'react'
import apiClient from '../../spotify';
import { useNavigate } from 'react-router-dom';
import { FaPlay } from "react-icons/fa";

const Library = () => {

  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
      const res =  await apiClient.get('me/playlists')
      setPlaylists(res.data.items);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPlaylists();
  }, []);

  const navigate = useNavigate();

  const clickPlaylistCard = (id) => {
    navigate('/player', {state : { playlistId : id, type : 'playlist' }});
  }

  return (
    <div className='bg-content w-full h-full text-warning p-4'>
      <h2 className='mb-4 font-bold text-2xl'>Your PlayLists</h2>
      <div className='flex flex-wrap gap-4'>
      {
        playlists.map(playlist => (
          <div key={playlist.id} onClick={() => clickPlaylistCard(playlist.id)}
            className="card bg-card max-w-72 cursor-pointer shadow-xl p-4 transform transition-transform duration-500 hover:scale-105 group">
          <img
            className=' rounded-2xl'
            src={playlist?.images[0].url}
            alt="playlist-photo"/>
        <div className="mt-4 ps-4 flex justify-between items-center">
          <div className='flex-1 min-w-0'>
            <h2 className="card-title mb-2 font-bold truncate">{playlist?.name}</h2>
            <p>{playlist?.tracks?.total} song{playlist?.tracks?.total > 1 ? 's' : ''}</p>
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

export default Library