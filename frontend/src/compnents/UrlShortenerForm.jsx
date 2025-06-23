import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import { logEvent } from '../utils/loggerMiddleware';
import { isValidUrl } from '../utils/validators';

const UrlShortenerForm = () => {
  const [urls, setUrls] = useState([{ longUrl: '', validity: '', shortcode: '' }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const addInput = () => {
    if (urls.length < 5) setUrls([...urls, { longUrl: '', validity: '', shortcode: '' }]);
  };

  const handleSubmit = () => {
    const res = urls.map(({ longUrl, validity, shortcode }) => {
      if (!isValidUrl(longUrl)) return { error: 'Invalid URL' };
      const finalShort = shortcode || Math.random().toString(36).substring(2, 8);
      const expiry = validity ? parseInt(validity) : 30;
      logEvent('URL_SHORTENED', { longUrl, finalShort, expiry });
      localStorage.setItem(finalShort, JSON.stringify({ longUrl, expiry, clicks: 0 }));
      return { shortUrl: `http://localhost:3000/${finalShort}`, longUrl, expiry };
    });
    setResults(res);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      {urls.map((u, i) => (
        <Grid container spacing={2} key={i} my={1}>
          <Grid item xs={12} md={4}><TextField label="Long URL" fullWidth value={u.longUrl} onChange={(e) => handleChange(i, 'longUrl', e.target.value)} /></Grid>
          <Grid item xs={12} md={3}><TextField label="Validity (mins)" type="number" fullWidth value={u.validity} onChange={(e) => handleChange(i, 'validity', e.target.value)} /></Grid>
          <Grid item xs={12} md={3}><TextField label="Custom Shortcode" fullWidth value={u.shortcode} onChange={(e) => handleChange(i, 'shortcode', e.target.value)} /></Grid>
        </Grid>
      ))}
      <Button variant="contained" onClick={addInput} sx={{ mr: 2 }}>Add More</Button>
      <Button variant="contained" color="success" onClick={handleSubmit}>Generate</Button>

      <Box mt={4}>
        {results.map((r, idx) => (
          <Box key={idx} my={1}>
            {r.error ? <Typography color="error">{r.error}</Typography> :
              <Typography>Shortened URL: <a href={r.shortUrl}>{r.shortUrl}</a> (expires in {r.expiry} mins)</Typography>}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default UrlShortenerForm;
