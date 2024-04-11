
import React from "react";

import Watchlist from '../components/Pages/Watchlist'

function watchlist() {

    return (
        <>
            <div className="px-10">
                <h1 className="md:text-3xl text-xl pb-3 font-medium">My Watchlist</h1>
                <Watchlist />
            </div>
        </>
    )
}

export default watchlist