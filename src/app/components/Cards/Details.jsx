import React from 'react'

function Details({ children, title, overview, release_date, runtime }) {
    return (
        <>
            <div className="h-full">
                <h2>{title}</h2>
                <p>{overview}</p>
                <p>Release Date: {release_date}</p>
                <p>Runtime: {runtime} minutes</p>

                {children}
            </div>
        </>
    )
}

export default Details