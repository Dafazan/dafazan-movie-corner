'use client'
import React, { useState } from 'react'
import Search from '../Pages/Search'

function Topbar() {

    const [isHiddenSearch, setIsHiddenSearch] = useState(true);

    const searchVisibility = () => {
        setIsHiddenSearch(!isHiddenSearch);
    };

    return (
        <div className='px-10 w-full py-3'>
            <div className="w-full bgblurbluef border-y border-blue-500">
                <div className="flex gap-2 ">
                    <a href='/' className='cursor-pointer px-2 text-blue-400 hover:bg-blue-500 hover:text-white'>HOME</a>
                    <a href='/watchlist' className='cursor-pointer px-2 text-blue-400 hover:bg-blue-500 hover:text-white'>MY WATCHLIST</a>
                    <a href='/ratings' className='cursor-pointer px-2 text-blue-400 hover:bg-blue-500 hover:text-white'>MY RATINGS</a>
                    <a href='/watched' className='cursor-pointer px-2 text-blue-400 hover:bg-blue-500 hover:text-white'>WATCHED LIST</a>
                    <div className='cursor-pointer px-2 text-blue-400 hover:bg-blue-500 hover:text-white'>MY LIST</div>
                    <a href='/profile' className='cursor-pointer px-2 text-blue-400 hover:bg-blue-500 hover:text-white'>PROFILE</a>
                    <div onClick={searchVisibility} className='cursor-pointer px-2 text-blue-400 hover:bg-blue-500 hover:text-white'>SEARCH</div>
                </div>
            </div>
            {isHiddenSearch ? null : (

                <div className="w-full bgblurbluef border-b border-blue-500">
                    <Search />
                </div>
            )}
        </div>
    )
}

export default Topbar