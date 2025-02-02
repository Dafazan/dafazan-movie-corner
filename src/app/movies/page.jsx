'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const token = localStorage.getItem('simkl_access_token');
      if (!token) return;

      try {
        const response = await axios.get('https://api.simkl.com/sync/history/movies', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Watched Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie, index) => (
          <div key={index} className="border p-2 rounded-lg shadow">
            <img src={movie.poster} alt={movie.title} className="w-full h-48 object-cover" />
            <h2 className="mt-2 text-lg font-semibold">{movie.title} ({movie.year})</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
