'use client';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation'; // Import useSearchParams and useRouter from next/navigation
import axios from 'axios';

export default function Callback() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const router = useRouter();

  useEffect(() => {
    if (code) {
      const getToken = async () => {
        try {
          const response = await axios.post('https://api.simkl.com/oauth/token', {
            client_id: process.env.NEXT_PUBLIC_SIMKL_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_SIMKL_CLIENT_SECRET,
            redirect_uri: process.env.NEXT_PUBLIC_SIMKL_REDIRECT_URI,
            grant_type: 'authorization_code',
            code,
          });

          localStorage.setItem('simkl_access_token', response.data.access_token);
          router.push('/movies');
        } catch (error) {
          console.error('Error fetching token:', error);
        }
      };
      getToken();
    }
  }, [code, router]); // Make sure router is included in the dependency array

  return <div className="text-center mt-10">Authenticating...</div>;
}
