import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

    //Early return
    if (!isMenuOpen) return null;

    return (
        <div className="p-5 shadow-lg w-[15%]">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li>Live</li>
                <li>Shorts</li>
                <li>Videos</li>
            </ul>
            <h1>Subscriptions</h1>
            <ul>
                <li>Music</li>
                <li>Sports</li>
                <li>gaming</li>
                <li>Movies</li>
                <li>Music</li>
            </ul>
            <h1>Watch Later</h1>
            <ul>
                <li>Music</li>
                <li>Sports</li>
                <li>gaming</li>
                <li>Movies</li>
                <li>Music</li>
            </ul>
        </div >
    )
}

export default Sidebar
