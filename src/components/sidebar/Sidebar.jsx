import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { Link, useLocation } from 'react-router-dom';
import apiClient from '../../spotify';
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { IoHeart } from "react-icons/io5";
import { PiPlaylistFill } from "react-icons/pi";

const Sidebar = () => {

    const [image, setImage] = useState(null);
    const [activeLink, setActiveLink] = useState(false);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const res = await apiClient.get('me');
                setImage(res.data?.images[1].url);
            } catch (err) {
                console.log(err);
            }
        };
        fetchImage();
    }, []);

    const {pathname} = useLocation();

    useEffect(() => {
        if (pathname.includes('feed')) {
            setActiveLink('/feed');
        } else if (pathname.includes('favourite')) {
            setActiveLink('/favourite');
        } else {
            setActiveLink('/');
        }
    }, [pathname]);

    return (
        <div className="fixed w-24 md:w-28">
            <div className='flex justify-center'>
                <img className='sidebar-img my-20' src={image} alt='logo' />
            </div>
            <ul style={{color: '#e6dddd'}} className=" font-bold p-4">
                <li className='mb-3'>
                    <Link to='/feed' >
                        <div className={`sidebar-tab flex flex-col items-center gap-1 ${activeLink === '/feed' ? 'active' : ''}`}>
                            <span><AiOutlineAppstoreAdd /></span>
                            <span className='text-sm'>Feed</span>
                        </div>
                    </Link>
                </li>
                <li className='mb-3'>
                    <Link to='/favourite'>
                        <div className={`sidebar-tab flex flex-col items-center gap-1 ${activeLink === '/favourite' ? 'active' : ''}`}>
                            <span><IoHeart /></span>
                            <span className='text-sm'>Album</span>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to='/'>
                        <div className={`sidebar-tab flex flex-col items-center gap-1 ${activeLink === '/' ? 'active' : ''}`}>
                            <span><PiPlaylistFill /></span>
                            <span className='text-sm'>PlayList</span>
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar