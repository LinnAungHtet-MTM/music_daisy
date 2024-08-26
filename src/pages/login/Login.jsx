import React from 'react'
import { Link } from 'react-router-dom'
import { loginEndPoint } from '../../spotify'
import logo from '../../assets/logo.png'

const Login = () => {
    return (
        <div style={{background: '#1db954'}} className='flex flex-col items-center justify-center p-5 w-full h-screen gap-10'>
            <img className='w-96' src={logo} alt="spotify" />
            <Link to={loginEndPoint}>
                <button
                    style={{color: '#e3e0dc'}}
                    className='py-4 px-10 md:px-20 rounded-full text-xl bg-black'>Connect Spotify
                </button>
            </Link>
        </div>
    )
}

export default Login