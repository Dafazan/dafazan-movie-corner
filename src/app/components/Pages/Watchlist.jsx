"use client";
import React from 'react'
import axios from "axios";
import { useState, useEffect } from 'react';
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
    orderBy,
    Firestore,
    serverTimestamp,
} from "firebase/firestore";
import MoviecardButonless from '@/app/components/Cards/MoviecardButonless'
import Details from "../Cards/Details";

function Watchlist() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getDataWatchlist();
    }, []);

    async function getDataWatchlist() {
        try {
            const ordersRef = collection(db, "moviewatchlist");
            const q = query(ordersRef, orderBy("timestamp"));
            const querySnapshot = await getDocs(q);

            let data = [];
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id });
            });

            // Fetch movie details from TMDB API
            const moviesWithData = await Promise.all(data.map(async (movie) => {
                const response = await fetchMovieData(movie.movieLink);
                return { ...movie, data: response };
            }));

            setMovies(moviesWithData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    async function fetchMovieData(movieLink) {
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const response = await fetch(`${movieLink}?api_key=${apiKey}`);
        const data = await response.json();

        // Extract relevant information (poster, description, title) from the response
        const { title, overview, poster_path } = data;

        // Construct the full URL for the poster
        const posterUrl = poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : null;

        // Return an object containing the extracted information
        return {
            title,
            overview,
            posterUrl
        };
    }

    async function deleteMovie(id) {
        try {
            await deleteDoc(doc(db, "moviewatchlist", id));
            console.log("Document successfully deleted!");
            // Update state after deletion
            setMovies(prevMovies => prevMovies.filter(movie => movie.id !== id));
        } catch (error) {
            console.error("Error deleting document:", error);
        }
    }


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
        <div className='w-full h-full'>
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-5">
                {movies.map((movie, i) => (
                    <MoviecardButonless
                        key={movie.id}
                        id={movie.id}
                        title={movie.data && movie.data.title}
                        img={movie.data.posterUrl}
                        desc={movie.data && movie.data.overview} >
                        <button onClick={() => fetchMovieDetails(movie.id)}
                            className="bg-blue-500 text-blue-950 font-semibold px-1">DETAILS</button>
                        <button onClick={() => deleteMovie(movie.id)}
                            className="bg-red-500 text-blue-950 font-semibold px-1">DELETE</button>
                    </MoviecardButonless>
                ))}
            </div>
        </div>
    )
}

export default Watchlist