import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../utils/appSlice'
import { YOUTUBE_SEARCH_API } from '../utils/constants';
import { cacheResults } from '../utils/searchSlice';
import { Link } from 'react-router-dom';

const Header = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    // console.log(searchQuery);

    const searchCache = useSelector((store) => store.search)

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchCache[searchQuery]) {
                setSuggestions(searchCache[searchQuery]);
            } else {
                getSearchSuggestions()
            }

        }
            , 200);
        return () => {
            clearTimeout(timer);
        }
    }, [searchQuery])

    const dispatch = useDispatch()
    const toggleMenuhandler = () => {
        dispatch(toggleMenu());
    }

    const getSearchSuggestions = async () => {
        const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
        const json = await data.json();
        console.log(json);
        setSuggestions(json[1]);
        // setShowSuggestions(true);

        //update cache
        dispatch(cacheResults({
            [searchQuery]: json[1],
        }));
    }

    return (
        <div className="flex justify-between align-middle p-5 shadow-lg">
            <div className="flex gap-3">
                <img
                    onClick={() => toggleMenuhandler()}
                    className="h-9 cursor-pointer"
                    alt="hamburger"
                    src="https://cdn.iconscout.com/icon/free/png-256/free-hamburger-menu-icon-download-in-svg-png-gif-file-formats--crispy-user-interface-pack-icons-462145.png?f=webp&w=256" />
                <Link to="/">
                    <img
                        className="h-9"
                        alt="logo"
                        src="https://1000logos.net/wp-content/uploads/2017/05/Youtube-Logo.png" />
                </Link>
            </div>
            <div className="flex align-middle">
                <div>
                    <input
                        type="text"
                        className="P-2 border border-gray-400 rounded-l-full w-96 px-4 h-10"
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value) }}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setShowSuggestions(false)}
                    ></input >
                    <button className="border h-10 border-gray-400 py-2 px-5 rounded-r-full bg-gray-100">Search</button>
                </div>
                {showSuggestions &&
                    <div className="fixed bg-white w-96 p-2 px-5 mt-[43px] shadow-lg">
                        <ul>
                            {suggestions?.map(s =>
                                <li className="px-3 py-2 hover:bg-gray-100">{s}</li>)
                            }
                        </ul>
                    </div>
                }
            </div >
            <div className="">
                <img
                    className="h-9"
                    src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                    alt="user"
                />
            </div>
        </div >
    )
}

export default Header