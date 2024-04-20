"use client";
import axios from "axios";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from "react";
import { useEffect, useState, useRef } from "react";
import ButtonDefault from "@/app/components/Buttons/ButtonDefault";
import { db } from "@/database/firebase";
import {
    collection,
    addDoc,
    getDocs,
    where,
    query,
    getDoc,
    deleteDoc,
    updateDoc,
    doc,
    Firestore,
    serverTimestamp,
} from "firebase/firestore";
import Moviecard from '@/app/components/Cards/Moviecard'
import Details from "../Cards/Details";
function Popular() {
    const [movies, setMovies] = useState([]);
    const [isDetail, setIsDetail] = useState(false);
    const [movieDetails, setMovieDetails] = useState([]);
    const [isLoadingD, setIsLoadingD] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorD, setErrorD] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
                const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
                const response = await axios.get(url);
                const fetchedMovies = response.data.results;
                setMovies(fetchedMovies);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, []); // Empty dependency array to run the effect only once on mount

    const handleCloseDetail = () => {
        setIsDetail(false);
    };
    const [castImages, setCastImages] = useState([]);

    const fetchMovieDetails = async (movieId) => {

        setIsLoadingD(true);
        setErrorD(null);
        try {
            const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
            const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
            const response = await axios.get(url);
            const movieDetails = response.data;

            const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;
            const creditsResponse = await axios.get(creditsUrl);
            const credits = creditsResponse.data;

            const castImages = [];
            for (const actor of credits.cast) {
                const personUrl = `https://api.themoviedb.org/3/person/${actor.id}?api_key=${apiKey}`;
                const personResponse = await axios.get(personUrl);
                const personDetails = personResponse.data;
                // Check if the person has a profile image
                if (personDetails.profile_path) {
                    castImages.push({
                        name: actor.name,
                        character: actor.character,
                        profileImage: `https://image.tmdb.org/t/p/w45/${personDetails.profile_path}`
                    });
                }
            }
            setCastImages(castImages);

            setMovieDetails({ ...movieDetails, credits });
            setIsDetail(true);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoadingD(false);
        }
    };
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        // Scroll two slides at a time
    };

      const settingscst = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 9,
        slidesToScroll: 1,
        // Scroll two slides at a time
    };

    const sliderRef = useRef(null);

    const handlePrev3 = () => {
        decrementValue()
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    const handleNext3 = () => {
        incrementValue();
        ;
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    return (
        <>
            {isLoadingD ? <><div className="w-full h-full overflow-y-scroll fixed top-0 z-40 bgblurbluef flex justify-center items-center">
                {isLoadingD && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
            </div></> : null}
            {isDetail ? <>
                <div className="w-full p-10 -translate-x-[40px] h-full overflow-y-scroll fixed top-0 z-40 bgblurbluef justify-center items-center">
                    <button onClick={handleCloseDetail}
                        className="bg-red-500 text-White font-semibold px-1">CLOSE</button>
                    {isDetail ? <>
                        {movieDetails && (
                            <Details overview={movieDetails.overview} release_date={movieDetails.release_date} runtime={movieDetails.runtime} title={movieDetails.title} genre={movieDetails.genres.map(genre => genre.name).join(', ')} img={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}>
                                
                                {castImages.length > 0 && (
                                    <div className=" border border-blue-500 p-5 mt-5">
                                        <h3 className="text-xl mb-5  text-center w-full">Cast</h3>

                            <Slider {...settingscst} className=' ' ref={sliderRef}>
                                 {castImages.map((cast, index) => (
                                                <div key={index} className="cast-member w-full">
                                                    <div className="w-full flex items-center justify-center">

                                                    <img className="w-[40px] rounded-md border border-blue-600" src={cast.profileImage} alt={`${cast.name}`} />
                                                    </div>
                                                     <div className="w-full flex flex-col text-center text-xs items-center justify-center">
                                                    
                                                    <div className="flex  w-full px-2 h-10 items-center justify-center">

                                                    <p className="bg-blue-500 px-1 rounded-md ">{cast.name}</p>
                                                    </div>
                                                    <p>as</p>
                                                      <div className="flex flex-col w-full px-2 min-h-10  items-center">

                                                    <p className="bg-green-600 px-1 rounded-md ">{cast.character}</p>
                                                    </div>
                                                    
                                                    </div>
                                                   
                                                </div>
                                            ))}
                            </Slider>
                                        
                                    </div>
                                )}
                            </Details>
                        )}
                    </> : null}



                </div>
            </> :

                <>

                    {isLoading && <p>Loading movies...</p>}
                    {error && <p>Error fetching movies: {error.message}</p>}
                    {movies.length > 0 && (
                        <div className="p-10 pt-0">
                            <h1 className="md:text-3xl text-xl pb-3 font-medium">Popular Movies</h1>
                            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-5 "> */}
                            <Slider {...settings} className=' ' ref={sliderRef}>
                                {movies.map((movie) => (
                                    <>
                                        <div className="px-3">
                                            <Moviecard key={movie.id} id={movie.id} img={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} title={movie.title} desc={movie.overview} >
                                                <button onClick={() => fetchMovieDetails(movie.id)}
                                                    className="bg-blue-500 text-blue-950 font-semibold px-1">DETAILS</button>
                                            </Moviecard>
                                        </div>
                                    </>
                                ))}
                            </Slider>
                            {/* </div> */}
                        </div>
                    )}
                    {movies.length === 0 && !isLoading && !error && <p>No movies found.</p>}
                </>
            }
        </>
    );
}

export default Popular;
