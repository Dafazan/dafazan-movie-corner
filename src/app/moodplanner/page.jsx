'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

const PEXELS_API_KEY = 'D84KWyN1A9NzbTEGwzFqEj1PDXRAOxuoDCN64pNGx62tJbxoeN2n2gXE';  // Replace with your actual API key

const ImagesPage = () => {
  const [images, setImages] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchImages = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.pexels.com/v1/search', {
        params: {
          query,
          per_page: 32, // Adjust the number of images you want to fetch
        },
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      });
      setImages(response.data.photos);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (keyword.trim()) {
      fetchImages(keyword);
    }
  };

  return (
   

    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Search Movie Stills</h1>
      <div className="flex gap-2 mb-6">
       <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter keyword (e.g., 'nature')"
      />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((image) => (

            <div key={image.id} className="rounded-lg overflow-hidden shadow-md">
            <img
              src={image.src.medium} alt={image.alt}
              className="w-full h-48 object-cover"
            />
          </div>

            
          ))}

      </div>
    </div>
  );
};

export default ImagesPage;
