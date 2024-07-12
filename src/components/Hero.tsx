import { Box, Button, Container, Typography } from "@mui/material";

export default function Hero() {
  return (
    <Box sx={{ backgroundColor: '#403D39' }}>
      <Container 
        maxWidth="xl"
        sx={{
          position: 'relative',
          // overflow: 'hidden',
          width: '100%',
          height: '100svh',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            top: '25%'
          }}
        >
          <Typography 
            variant="h1"
            sx={{ 
              color: '#FFFCF2', 
              display: 'block',
              width: '60%',
              fontWeight: 700,
              fontStyle: 'italic',
              letterSpacing: '0.2em'
            }}
          >
            Your Personal Music Heaven
          </Typography>
          <Box
            sx={{
              display: 'flex',
              mt: 25,
            }}
          >
            <Box 
              sx={{
                display: 'flex',
                width: '40%',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '15em 15em',
                }}
              >
                <Button
                  sx={{
                    backgroundColor: '#EB5E28',
                    color: '#FFFCF2',
                    display: 'block',
                    fontSize: '1.5em',
                    fontFamily: 'monospace',
                    '&:hover': {
                      backgroundColor: '#C24C1E',
                    }
                  }}
                >
                  Top Songs
                </Button>
                <Button
                  sx={{
                    backgroundColor: '#FFFCF2',
                    color: '#403D39',
                    display: 'block',
                    ml: 4,
                    fontSize: '1.5em',
                    fontFamily: 'monospace',
                    '&:hover': {
                      backgroundColor: '#D0CEC6',
                    }
                  }}
                >
                  Best Artists
                </Button>
              </Box>
            </Box>
            <Typography 
              variant="h5"
              sx={{ 
                color: '#FFFCF2',
                display: 'block',
                width: '60%',
                fontWeight: 200,
                textAlign: 'right',
                letterSpacing: '0.2em'
              }}
            >
              Stream, save, and explore the tunes that match your vibe. Dive into endless playlists and discover new favorites.
            </Typography>
          </Box>
        </Box>
      </Container>
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
          filter: 'blur(4px)',
          top: 0,
          position: 'absolute',
          zIndex: 1
        }}
      />
    </Box>
  );
};