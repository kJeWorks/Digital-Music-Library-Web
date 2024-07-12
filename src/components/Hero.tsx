import { useTheme } from '@mui/material/styles';
import { Box, Button, Container, Typography, useMediaQuery } from "@mui/material";

export default function Hero() {
  const theme = useTheme();

  const isLg = useMediaQuery(theme.breakpoints.up('xl'));
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  let titleVariant: "h3" | "h1" | "h5";
  let secondaryVariant: "body1" | "h5" | "body2";
  let imageHeight: string = '100svh';
  if (isXs) {
    imageHeight = '145svh';
    titleVariant = 'h5';
    secondaryVariant = "body2";
  } else if (isSm) {
    titleVariant = 'h5';
    secondaryVariant = "body2";
  } else if (isLg) {
    titleVariant = 'h1';
    secondaryVariant = "h5"
  } else {
    titleVariant = 'h3';
    secondaryVariant = "body1"
  }

  return (
    <Box sx={{ backgroundColor: '#403D39', height: { sm: '100svh', xs: '145svh' } }}>
      <Container 
        maxWidth="xl"
        sx={{
          position: 'relative',
          width: '100%',
          height: { sm: '100svh', xs: '110svh'},
          // p: { md: '0 24px', sm: '0 24px', xs: '20% 24px 70% 24px' }
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
            variant={titleVariant}
            sx={{ 
              color: '#FFFCF2', 
              display: 'block',
              width: { md: '60%', xs: '100%'},
              textAlign: { md: 'left', xs: 'center' },
              fontWeight: 700,
              fontStyle: 'italic',
              letterSpacing: '0.2em'
            }}
          >
            Your Personal Music Heaven
          </Typography>
          <Box
            sx={{
              display: { md: 'flex', xs: 'block' },
              mt: { lg: 20, md: 10, xs: 4 },
            }}
          >
            <Box 
              sx={{
                width: { md: '40%' },
              }}
            >
              <Box
                sx={{
                  width: 'max-content',
                  display: 'grid',
                  gridTemplateColumns: { xl: '15em 15em', md: '10em 12em', xs: '8em 10em' },
                  margin: { md: 0, xs: 'auto' },
                }}
              >
                <Button
                  sx={{
                    backgroundColor: '#EB5E28',
                    color: '#FFFCF2',
                    display: 'block',
                    fontSize: { xl: '1.2em', md: '1em', xs: '0.8em' },
                    fontFamily: 'monospace',
                    '&:hover': {
                      backgroundColor: '#C24C1E',
                    },
                  }}
                >
                  Top Songs
                </Button>
                <Button
                  sx={{
                    backgroundColor: '#FFFCF2',
                    color: '#403D39',
                    display: 'block',
                    fontSize: { xl: '1.2em', md: '1em', xs: '0.8em' },
                    fontFamily: 'monospace',
                    '&:hover': {
                      backgroundColor: '#D0CEC6',
                    },
                    ml: 4
                  }}
                >
                  Best Artists
                </Button>
              </Box>
            </Box>
            <Typography 
              variant={secondaryVariant}
              sx={{ 
                color: '#FFFCF2',
                display: 'block',
                width: { md: '60%' },
                fontWeight: 200,
                letterSpacing: '0.2em',
                textAlign: { md: 'right', xs: 'center' },
                mt: { md: 0, xs: 4 }
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
          height: imageHeight,
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