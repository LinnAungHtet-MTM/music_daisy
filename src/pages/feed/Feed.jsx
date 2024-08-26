import React, { useEffect, useState } from 'react'
import apiClient from '../../spotify';
import { MdOutlineSearch } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import './Feed.css';
import SearchSong from '../../components/searchsong/SearchSong';
import FeedSong from '../../components/feedsong/FeedSong';

const Feed = () => {

  const [topArtistId, setTopArtistId] = useState(null);
  const [topTrackId, setTopTrackId] = useState(null);
  const [recommendSongs, setRecommendSongs] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [recentSongs, setRecentSongs] = useState([]);
  const [searchSongs, setSearchSongs] = useState([]);

  useEffect(() => {
    const fetchTopSongs = async () => {
      try {
        const resTopArtists = await apiClient.get('/me/top/artists')
        setTopArtistId(resTopArtists.data?.items[0]?.id);

        const resTopTracks = await apiClient.get('/me/top/tracks')
        setTopTrackId(resTopTracks.data?.items[0]?.id);
      } catch (err) {
        console.log(err);
      }
    }

    fetchTopSongs();

    const fetchRecommendSongs = async () => {
      try {
        if (topArtistId && topTrackId) {
          const resRecommendation = await apiClient.get('/recommendations', {
            params: {
              seed_artists: topArtistId,
              seed_tracks: topTrackId
            }
          });
          setRecommendSongs(resRecommendation.data?.tracks)
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecommendSongs();
  }, [topArtistId, topTrackId]);

  useEffect(() => {
    const fetchSearchSongs = async () => {
      try {
        if(searchValue) {
          const res = await apiClient.get(`/search`, {
            params: {
              q: searchValue,
              type: 'track'
            }
          });
          setSearchSongs(res.data?.tracks?.items);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchSearchSongs();
  }, [searchValue]);

  useEffect(() => {
    const FetchRecentlyPlayed = async () => {
      try {
        const res = await apiClient.get('/me/player/recently-played');
        setRecentSongs(res.data?.items)
      } catch (err) {
        console.log(err);
      }
    };
    FetchRecentlyPlayed();
  }, []);

  return (
    <div className='bg-content w-full h-full text-warning p-7'>
      <div className='relative w-full md:w-[30%]'>
        <div className='absolute text-xl top-1/2 left-3 transform -translate-y-1/2 text-gray-500'>
          <MdOutlineSearch />
        </div>
        <input
          className='search-input pl-10 w-full py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500'
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder='What do you want to play?'
        />
        {searchValue && (
          <div
            className='absolute text-xl top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer'
            onClick={() => setSearchValue('')}
          >
            <RxCross2 />
          </div>
        )}
      </div>
      { searchValue ? 
        <SearchSong searchSongs={searchSongs}/> :
        <FeedSong recommendSongs={recommendSongs} recentSongs={recentSongs}/>
      }
    </div>
  )
}

export default Feed