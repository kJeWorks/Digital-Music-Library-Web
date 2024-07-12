import { Box } from "@mui/material";

export default function Hero() {
  return (
    <Box sx={{ backgroundColor: '#403D39' }}>
      <img 
        src="/hero-background.png" 
        alt="hero-img"
        style={{
          width: '100%',
          height: '100svh',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
          opacity: 0.30,
          filter: 'blur(4px)'
        }}
      />
    </Box>
  );
};