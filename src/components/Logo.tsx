import { Box, Typography } from "@mui/material";

export default function Logo() {
  return (
    <>
      <Typography 
        variant='h4' 
        sx={{ 
          fontWeight: 700,
          color: '#403D39'
        }}
      >
        V
      </Typography>
      <Typography
        variant="h5"
        noWrap
        sx={{
          fontFamily: 'monospace',
          fontWeight: 400,
          letterSpacing: '.3rem',
          textDecoration: 'none',
          alignSelf: 'center',
          color: '#403D39'
        }}
      >
        ibe
      </Typography>
      <Typography 
        variant='h4'
        sx={{ 
          fontWeight: 700,
          color: '#EB5E28'
        }}
      >
        V
      </Typography>
      <Typography
        variant="h5"
        noWrap
        sx={{
          mr: 2,
          fontFamily: 'monospace',
          fontWeight: 400,
          letterSpacing: '.3rem',
          color: '#EB5E28',
          textDecoration: 'none',
          alignSelf: 'center',
        }}
      >
        ault
      </Typography>
    </>
  )
};