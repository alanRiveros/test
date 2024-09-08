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
          <Typography variant="body2">{description}</Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'right' }}>
          {icon && <Box>{icon}</Box>}
          <Typography variant="h5">{value}</Typography>
        </Grid>
      </Grid>

      {indicator && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">{indicator}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default WeatherInfoCard;
