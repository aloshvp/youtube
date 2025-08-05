import React from 'react'

const VideoCard = ({ info }) => {
    if (!info || !info.snippet) {
        return null;
    }
    const { snippet, statistics } = info;
    const { channelTitle, title, thumbnails, publishedAt } = snippet;
    const { viewCount } = statistics;

    return (
        <div className="flex flex-wrap gap-2">
            <div className="p-2 w-72">
                <div className="w-full h-36 overflow-hidden rounded-lg">
                    <img
                        src={thumbnails?.high?.url}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>
                <h5 className='mt-3'>{title}</h5>
                <p>{channelTitle}</p>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>{viewCount} views</span>
                    <span>{publishedAt}</span>
                </div>
            </div>
        </div>
    )
}

export const AdVideoCard = ({ info }) => {
    return <div className="p-1 m-1 border border-red-900">
        <VideoCard info={info} />
    </div >
}

export default VideoCard;