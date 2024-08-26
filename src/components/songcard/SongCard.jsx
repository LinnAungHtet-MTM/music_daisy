import React from 'react';
import './SongCard.css';

const SongCard = ({album}) => {

    const artists = [];
    album?.artists?.map(artist => artists.push(artist.name));


    return (
        <div>
            <div className='flex justify-center items-center'>
                <img className='rounded-xl w-64' src={album?.images[1].url} alt="album" />
            </div>
            <div className='p-2 text-warning font-bold'>
                <p className='mb-1 text-xl w-72 truncate'>{album?.name}</p>
                <p>Release Date : {album?.release_date}</p>
                <div className='marquee'>
                    <p className='text-sm mb-1'>{album?.name} is an {album?.album_type} by {artists.join(', ')} with {album?.total_tracks} tracks</p>
                </div>
            </div>
        </div>
    )
}

export default SongCard