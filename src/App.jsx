import React, { useEffect, useState } from 'react'
import Sidebar from './components/sidebar/Sidebar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Library from './pages/library/Library'
import Feed from './pages/feed/Feed'
import Player from './pages/player/Player'
import Favourite from './pages/favourite/Favourite'
import Login from './pages/login/login'
import { setClientToken } from './spotify'

const App = () => {

  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token');
    const tokenExpiryTime = window.localStorage.getItem('tokenExpiryTime');
    window.location.hash = '';

    if (!token && hash) {
      const _token = hash.split('&')[0].split('=')[1];

      const expiryTime = Date.now() + 3600 * 1000;

      window.localStorage.setItem('token', _token);
      window.localStorage.setItem('tokenExpiryTime', expiryTime);
      setToken(_token);
      setClientToken(_token);
    } else if (token && tokenExpiryTime && Date.now() < tokenExpiryTime) {
      setToken(token);
      setClientToken(token);
    } else {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('tokenExpiryTime');
      setToken(null);
      navigate('/');
    }
  }, []);

  return (
    token ? (
      <div className='flex w-full min-h-screen'>
        <div className='bg-sidebar w-24 md:w-28'>
          <Sidebar/>
        </div>
      <div className='flex-1 overflow-auto'>
      <Routes>
        <Route path='/' element={<Library/>}/>
        <Route path='/feed' element={<Feed/>}/>
        <Route path='/player' element={<Player/>}/>
        <Route path='/favourite' element={<Favourite/>}/>
      </Routes>
      </div>
    </div>
    ) : <Login/>
  )
}

export default App