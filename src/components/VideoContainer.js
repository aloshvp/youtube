import React, { useState, useEffect } from 'react'
import { YOUTUBE_VIDEOS_API } from '../utils/constants';
import VideoCard, { AdVideoCard } from './VideoCard';
import { Link } from 'react-router-dom';

const VideoContainer = () => {

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        getVideos();
    }, []);

    const getVideos = async () => {
        const data = await fetch(YOUTUBE_VIDEOS_API);
        const json = await data.json();
        setVideos(json.items);
        // console.log(json.items);
    }

    return (
        <div className="flex flex-wrap justify-between">
            {videos[0] &&
                <AdVideoCard info={videos[0]} />
            }
            {
                videos?.map((video, index) =>
                    <>
                        <Link to={`/watch?v=${video.id}`} key={index}>
                            < VideoCard info={video} />
                        </Link >
                    </>

                )
            }
        </div >
    )
}

export default VideoContainer
