
import React from "react";

import Watched from '../components/Pages/Watched'

function watchlist() {

    return (
        <>
            <div className="px-10 py-5">
                <h1 className="md:text-3xl text-xl pb-3 font-medium">Watched Movies</h1>
                <Watched />
            </div>
        </>
    )
}

export default watchlist