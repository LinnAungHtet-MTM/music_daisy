import React from 'react';
import './WidgetCard.css';

const WidgetCard = ({title, similarArtists, featured, release}) => {

  return (
    <div className='widget-card md:w-[32%] p-6 text-warning font-bold cursor-pointer shadow-xl transform transition-transform duration-500 hover:scale-105'>
        <h2 className='text-xl'>{title}</h2>
        {
            similarArtists ? similarArtists.map(artist => (
                <div key={artist.id} className='flex items-center gap-2 mt-5'>
                    <img className='w-12 h-12 rounded-xl' src={artist?.images[2]?.url} alt="" />
                    <div className='w-36'>
                      <h2 className='truncate'>{artist?.name}</h2>
                      <p className='text-xs truncate'>{artist?.followers?.total} followers</p>
                    </div>
                </div>
            )) : featured ? featured.map(playlist => (
                <div key={playlist.id} className='flex items-center gap-2 mt-5'>
                    <img className='w-12 h-12 rounded-xl' src={playlist?.images[0]?.url} alt="" />
                    <div className='w-36'>
                      <h2 className='truncate'>{playlist?.name}</h2>
                      <p className='text-xs truncate'>{playlist?.tracks?.total} Songs</p>
                    </div>
                </div>
            )) : release.map(album => (
                <div key={album.id} className='flex items-center gap-2 mt-5'>
                    <img className='w-12 h-12 rounded-xl' src={album?.images[2]?.url} alt="" />
                    <div className='w-36'>
                      <h2 className='truncate'>{album?.name}</h2>
                      <p className='text-xs truncate'>{album?.artists[0]?.name}</p>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default WidgetCard