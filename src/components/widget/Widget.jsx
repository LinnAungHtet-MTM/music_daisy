import React, { useEffect, useState } from 'react'
import apiClient from '../../spotify';
import WidgetCard from '../widgetcard/WidgetCard';

const Widget = ({currentTrack, type}) => {

    const [similarArtists, setSimilarArtists] = useState([]);
    const [featured, setFeatured] = useState([]);
    const [newRelease, setNewRelease] = useState([]);

    const artistId = type === 'playlist' ? currentTrack?.album?.artists[0]?.id : currentTrack?.id;

    useEffect(() => {
        const fetchRelatedSongs = async () => {
            try {
                if (artistId && type === 'playlist') {
                    const resArtists = await apiClient.get(`/artists/${artistId}/related-artists`)
                    setSimilarArtists(resArtists.data?.artists.slice(0, 3));
                }
                const resFeatured = await apiClient.get(`/browse/featured-playlists`)
                setFeatured(resFeatured.data?.playlists?.items.slice(0, 3));

                const resRelease = await apiClient.get(`/browse/new-releases`)
                setNewRelease(resRelease.data?.albums?.items.slice(0, 3));
            } catch (err) {
                console.log(err);
            }
        };
        fetchRelatedSongs();
    }, [artistId]);

  return (
    <div className={`flex ${type === 'playlist' ? 'justify-between' : 'justify-evenly'} items-center`}>
        { type === 'playlist' &&  <WidgetCard title='Similar Artists' similarArtists={similarArtists}/> }
        <WidgetCard title='Made For You' featured={featured}/>
        <WidgetCard title='New Releases' release={newRelease}/>
    </div>
  )
}

export default Widget