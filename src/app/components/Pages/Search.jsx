"use client";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
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


function Search() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isMovie, setIsMovie] = useState(true);
    const [searchResults, setSearchResults] = useState([]);
    const [data, setData] = useState([{ movie: "", timestamp: "" }]);
    const handleSave = (value) => {
        setContent(value);
    };
    const addData = async (e) => {
        e.preventDefault();
        const docRef = await addDoc(collection(db, "movies"), {
            movie: movie,
            timestamp: serverTimestamp(),
            source: "web",
        });
        const handleUpload = () => {
            setData([...data, { movie: "", timestamp: "" }]);
        };
        alert("success");
    };
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        try {


            setIsMovie(true);
            const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Replace with your actual API key
            const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`;
            const response = await axios.get(url);
            setSearchResults(response.data.results);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };
    const handleSubmitTv = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        try {

            setIsMovie(false);
            const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Replace with your actual API key
            const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${searchTerm}`;
            const response = await axios.get(url);
            setSearchResults(response.data.results);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };
    const [isDetail, setIsDetail] = useState(false);
    const [movieDetails, setMovieDetails] = useState([]);
    const [isLoadingD, setIsLoadingD] = useState(false);
    const [errorD, setErrorD] = useState(null);

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

    return (
        <>
           
            {isLoadingD ? <><div className="w-full h-full overflow-y-scroll fixed top-0 z-40 bgblurbluef flex justify-center items-center">
                {isLoadingD && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
            </div></> : null}
            {isDetail ? <>
                <div className="w-full p-10 h-full overflow-y-scroll fixed top-0 z-40 bgblurbluef flex justify-center items-center">
                    <button onClick={handleCloseDetail}
                        className="bg-red-500 text-White font-semibold px-1">CLOSE</button>
                    {isDetail ? <>
                        {movieDetails && (
                            <Details overview={movieDetails.overview} release_date={movieDetails.release_date} runtime={movieDetails.runtime} title={movieDetails.title}>
                                <p>Genres: {movieDetails.genres.map(genre => genre.name).join(', ')}</p>
                                {castImages.length > 0 && (
                                    <div>
                                        <h3>Cast</h3>
                                        <div className="cast-images">
                                            {castImages.map((cast, index) => (
                                                <div key={index} className="cast-member">
                                                    <img src={cast.profileImage} alt={`${cast.name}`} />
                                                    <p>{cast.name} as {cast.character}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </Details>
                        )}
                    </> : null}



                </div>


                 <div className="w-screen h-screen flex flex-col  item-center justify-center items-center fixed z-50">
                 <div className=" flex justify-center w-[90%]">

                        <button onClick={handleCloseDetail} className="bg-red-500 rounded-t-xl w-full font-bold px-1">CLOSE</button>
                        </div>
                <div className="w-[90%] h-[90%]  bgblurblue border border-blue-500 rounded-b-xl p-3  ">
                    
                    <div className="flex flex-col h-full overflow-y-scroll gap-5">
                       
                        <div className="flex justify-center">
                        <div className="bg-red-900 rounded-md w-32 h-48">

                        </div>

                        </div>
                        {isDetail ? <>
                        {movieDetails && (
                            <>
                            <div className="w-full flex flex-col gap-2">
                            <div className="sticky top-0 bg-blue-500 p-1 rounded-sm">
                                <p className=" font-semibold text-2xl">{movieDetails.title} ({movieDetails.release_date.split("-")[0]})</p>
                                <p className="text-xs">{movieDetails.genres.map(genre => genre.name).join(', ')}</p>
                                
                            </div>
                            <p className="font-light">{movieDetails.overview}</p>
                            <p className="font-medium">{movieDetails.runtime} Minutes</p>
                            <div className="flex flex-col gap-2">
                                {castImages.length > 0 && (
<>

                                    <p>Cast</p>
                                <div className="w-full overflow-x-auto">
                                <div className="inline-flex gap-2">
                                    {castImages.map((cast, index) => (

                                        <div key={index} className="border border-blue-500 rounded-md p-1 h-20 gap-1 flex">
                                        <div className="w-12 bg-black rounded-md"> <img className="bg-cover w-full h-full rounded-md" src={cast.profileImage} alt={`${cast.name}`} /></div>
                                        <div className="text-xs w-24">
                                            <p>{cast.name}</p>
                                            <p>As {cast.character}</p>
                                        </div>
                                    </div>

                            
                                            ))}
                                    
                                   
                                </div>
                                </div>
</>
                                
                                    
                                )}
                                


                            </div>
                        </div>
                            {/* <Details overview={movieDetails.overview} release_date={movieDetails.release_date} runtime={movieDetails.runtime} title={movieDetails.title}>
                                <p>Genres: {movieDetails.genres.map(genre => genre.name).join(', ')}</p>
                                {castImages.length > 0 && (
                                    <div>
                                        <h3>Cast</h3>
                                        <div className="cast-images">
                                            {castImages.map((cast, index) => (
                                                <div key={index} className="cast-member">
                                                    <img src={cast.profileImage} alt={`${cast.name}`} />
                                                    <p>{cast.name} as {cast.character}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </Details> */}
                            </>
                        )}
                    </> : null}

                        
                    </div>
                </div>
            </div>


            </> :
                null}
            <div className="p-10">
                <div className="flex flex-col md:flex-row gap-5">
                    <div className="w-full">

                        <div className="flex w-full h-full flex-col md:flex-row items-center md:gap-3">

                            <form className="w-full" onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="Search Title..."
                                    value={searchTerm}
                                    onChange={handleChange}
                                    className="text-green-500 border-b-[1px] border-blue-500 text-2xl w-full focus:outline-none focus:border-opacity-100 bg-transparent py-1"
                                />
                            </form>
                            <div className="flex md:flex-row md:gap-3 flex-col">

                            <div>

                                <ButtonDefault action={handleSubmit} text={"SEARCH MOVIE"} />
                            </div>
                            <div>
                                <ButtonDefault action={handleSubmitTv} text={"SEARCH SERIES"} />
                            </div>
                            </div>
                        </div>
                        <div className="flex w-3/6">
                        </div>
                    </div>

                </div>
                {isLoading && <p>Loading results...</p>}
                {error && <p>Error: {error.message}</p>}
                {searchResults.length > 0 && (
                    <>
                        <h1 className="md:text-3xl text-xl pb-3 font-medium">Search results for <span className="text-lime-600">&quot;{searchTerm}&quot;</span> in {isMovie ? 'movies' : 'tv series'} :</h1>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {searchResults.map((movie) => (
                                <Moviecard key={movie.id} id={movie.id} img={movie.poster_path} title={isMovie ? movie.title : movie.name} desc={movie.overview} >
                                    <button onClick={() => fetchMovieDetails(movie.id)}
                                        className="bg-blue-500 text-blue-950 font-semibold px-1">DETAILS</button>
                                </Moviecard>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default Search