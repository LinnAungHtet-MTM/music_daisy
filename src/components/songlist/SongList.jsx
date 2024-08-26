import React from 'react';

const SongList = ({ tracks, setCurrentIndex, currentTrack, songType }) => {

  return (
    <div className='bg-card p-4 flex-1 rounded-2xl text-warning font-bold h-64 overflow-y-scroll'>
      <h2 className='text-xl mb-3'>Next in queue</h2>
      {
        songType === 'playlist' ?
          (
            tracks.map((track, index) => (
              <div
                key={index + 'key'}
                className={`w-full flex mb-1 cursor-pointer justify-between items-center transform transition-transform duration-500 hover:scale-105 ${track.track.id === currentTrack.id ? 'text-gray-300' : ''}`}
                onClick={() => setCurrentIndex(index)}>
                <p className='w-52 truncate'>{track?.track.name}</p>
                <p>0:30</p>
              </div>
            ))
          ) :

          (tracks?.tracks.items.map((track, index) => (
            <div
              key={index + 'key'}
              className={`w-full flex mb-1 cursor-pointer justify-between items-center transform transition-transform duration-500 hover:scale-105 ${track.id === currentTrack.id ? 'text-gray-300' : ''}`}
              onClick={() => setCurrentIndex(index)}>
              <p className='w-52 truncate'>{track?.name}</p>
              <p>0:30</p>
            </div>
          )))
      }
    </div>
  )
}

export default SongList