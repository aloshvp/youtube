import React from 'react'

// Convert 1234567 => "1.2M"
const formatViewCount = (num) => {
    if (!num) return '';
    const count = parseInt(num, 10);
    if (count >= 1e9) return (count / 1e9).toFixed(1) + 'B';
    if (count >= 1e6) return (count / 1e6).toFixed(1) + 'M';
    if (count >= 1e3) return (count / 1e3).toFixed(1) + 'K';
    return count.toString();
};

// Convert publishedAt => "2 days ago", "3 months ago"
const timeAgo = (dateString) => {
    const now = new Date();
    const published = new Date(dateString);
    const seconds = Math.floor((now - published) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
            return `${interval} ${unit}${interval !== 1 ? 's' : ''} ago`;
        }
    }

    return 'Just now';
};

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
                <p className='text-gray-500 text-xs'>{channelTitle}</p>
                <div className="flex justify-between text-sm text-gray-600">
                    <span className='text-gray-500 text-xs'>{formatViewCount(viewCount)} views</span>
                    <span className='text-gray-500 text-xs'>{timeAgo(publishedAt)}</span>
                </div>
            </div>
        </div>
    )
}

export const AdVideoCard = ({ info }) => {
    return <div className=" m-1 border border-red-900 rounded-lg">
        <VideoCard info={info} />
        <span className='text-xs p-2 font-bold'>Sponsored</span>
    </div >
}

export default VideoCard;