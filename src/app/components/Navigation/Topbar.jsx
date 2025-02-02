'use client'
import React, { useState } from 'react'
import Search from '../Pages/Search'

function Topbar() {

    const [isHiddenSearch, setIsHiddenSearch] = useState(true);
    const [isHiddenList, setIsHiddenList] = useState(true);

    const searchVisibility = () => {
        setIsHiddenSearch(!isHiddenSearch);
        setIsHiddenList(true);
    };
    const listVisibility = () => {
        setIsHiddenList(false);
        setIsHiddenSearch(true);
    };
    const listVisibilityoff = () => {
        setIsHiddenList(true);
        setIsHiddenSearch(true);
    };

    return (
        <div className='px-10 w-full py-3 md:block hidden'>
            <div className="w-full bgblurbluef border-y border-blue-500">
                <div className="flex gap-2 ">
                    <a href='/' className='cursor-pointer px-2 text-blue-400 hover:bg-blue-500 hover:text-white'>HOME</a>
                    <a href='/watchlist' className='cursor-pointer px-2 text-blue-400 hover:bg-blue-500 hover:text-white'>MY WATCHLIST</a>
                    <a href='/ratings' className='cursor-pointer px-2 text-blue-400 hover:bg-blue-500 hover:text-white'>MY RATINGS</a>
                    <a href='/watched' className='cursor-pointer px-2 text-blue-400 hover:bg-blue-500 hover:text-white'>WATCHED</a>
                    <div onMouseEnter={listVisibility} className='cursor-pointer px-2 text-blue-400 hover:bg-blue-500 hover:text-white'>MY LIST</div>
                    <a href='/profile' className='cursor-pointer px-2 text-blue-400 hover:bg-blue-500 hover:text-white'>PROFILE</a>
                    <div onClick={searchVisibility} className='cursor-pointer px-2 text-blue-400 hover:bg-blue-500 hover:text-white'>SEARCH</div>
                </div>
            </div>
            {isHiddenSearch ? null : (

                <div className="w-full bgblurbluef border-b border-blue-500">
                    <Search />
                </div>
            )}
            {isHiddenList ? null : (

                <div onMouseLeave={listVisibilityoff} className="w-full bgblurbluef border-b border-blue-500">
                    <div className="flex w-full px-3 py-4">

                        <div className=' w-2/12 flex flex-col'>
                            <a href="">FAVORITES</a>
                            <a href="">+ NEW LIST</a>

                        </div>
                        <div className=' w-2/12 flex flex-col'>
                            <a href="">My List #1</a>
                            <a href="">My Fav Romance</a>
                            <a href="">Good Stuff</a>
                            <a href="">My List #2</a>

                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Topbar