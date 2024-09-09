import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const WeatherInfoCard = ({ title, description, value, icon, indicator }) => {
  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: 'lightgray',
        color: 'black',
        borderRadius: 4,
        minHeight: '180px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant="h6">{title}</Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'right' }}>
          <Typography variant="h5">{value}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WeatherInfoCard;
