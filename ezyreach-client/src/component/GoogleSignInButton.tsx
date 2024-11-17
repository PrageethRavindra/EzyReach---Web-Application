'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    google: any;
  }
}

export default function GoogleSignInButton() {
  useEffect(() => {
    // Load the Google Identity Services library
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.onload = () => {
      window.google?.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your client ID
        callback: handleCallbackResponse,
      });
      window.google?.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        {
          type: 'standard',
          size: 'large',
          theme: 'outline',
          text: 'sign_in_with',
          shape: 'rectangular',
          logo_alignment: 'left',
        }
      );
    };
    document.body.appendChild(script);
  }, []);

  const handleCallbackResponse = (response: any) => {
    console.log('Encoded JWT ID token: ', response.credential);
    // Add your login logic here
  };

  return (
    <div>
      <div
        id="google-signin-button"
        style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      ></div>
    </div>
  );
}
