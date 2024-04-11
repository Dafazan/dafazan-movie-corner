
import React from "react";

import Ratings from '../components/Pages/Ratings'

function watchlist() {

    return (
        <>
            <div className="px-10 py-5">
                <h1 className="md:text-3xl text-xl pb-3 font-medium">My Ratings</h1>
                <Ratings />
            </div>
        </>
    )
}

export default watchlist