import React from 'react'
import Button from './Button'

const list = [
    "All", "Live", "Gaming", "Football", "Songs", "Cooking"
]


const ButtonList = () => {
    return (
        <div className="flex gap-5 p-5">
            {list?.map((item, index) =>
                <Button name={item} key={index} />
            )}
        </div>
    )
}

export default ButtonList