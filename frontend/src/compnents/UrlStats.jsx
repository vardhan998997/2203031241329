import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const UrlStats = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const items = Object.keys(localStorage)
      .filter((key) => key.length <= 8 && key !== 'appLogs')
      .map((key) => {
        const { longUrl, expiry, clicks } = JSON.parse(localStorage.getItem(key));
        return { key, longUrl, expiry, clicks };
      });
    setData(items);
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h4">URL Statistics</Typography>
      {data.map(({ key, longUrl, expiry, clicks }, i) => (
        <Box key={i} my={2}>
          <Typography>Short: <a href={`/${key}`}>{key}</a></Typography>
          <Typography>Original: {longUrl}</Typography>
          <Typography>Expiry (mins): {expiry}</Typography>
          <Typography>Clicks: {clicks}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default UrlStats;
