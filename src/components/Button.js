import React from 'react'

const Button = ({ name }) => {
    return (
        <div>
            <button className="px-5 bg-gray-200 rounded-sm">{name}</button>
        </div >
    )
}

export default Button
