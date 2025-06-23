import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { logEvent } from '../utils/loggerMiddleware';

const RedirectHandler = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    const item = localStorage.getItem(shortcode);
    if (item) {
      const data = JSON.parse(item);
      data.clicks += 1;
      logEvent('URL_REDIRECTED', { shortcode, target: data.longUrl });
      localStorage.setItem(shortcode, JSON.stringify(data));
      window.location.href = data.longUrl;
    } else {
      alert('Invalid or expired URL');
    }
  }, [shortcode]);

  return <div>Redirecting...</div>;
};

export default RedirectHandler;
