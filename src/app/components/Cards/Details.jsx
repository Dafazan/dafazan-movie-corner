import React from 'react'

function Details({ children, title, overview, release_date, runtime,genre, img }) {
    return (
        <>
        <div className='w-full border border-blue-500 flex p-10 gap-5'>
          <div className=' w-[220px] '>
           
                <img className='rounded-md w-full' src={img} alt="No Poster" />
            
          </div>
          <div className='w-full'>
                <div className='flex gap-3 mb-2'>
                    <h2 className='text-2xl text-blue-400'>{title}</h2>
                    <div className='flex flex-col justify-center items-center'>

                        <p className='text-white bg-blue-500 px-2 text-sm rounded-sm'>{genre}</p>
                    </div>
                </div>
                <p>{overview}</p>
                <br />
                <p className='text-green-600'>Runtime: {runtime} minutes</p>
                <p className='text-green-600'>Release Date: {release_date}</p>

          </div>
        </div>
            <div className="h-full">
               
            
                {children}
            </div>
        </>
    )
}

export default Details