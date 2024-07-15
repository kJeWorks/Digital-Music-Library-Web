import { useTheme } from '@mui/material/styles';
import { Box, Button, Container, Typography, useMediaQuery } from "@mui/material";
import { PageType } from '../types/PageType';
import { Link } from 'react-router-dom';

type Props = {
  pages: Array<PageType>;
  setPages(pages: Array<PageType>): void;
};

export default function Hero(props: Props) {
  const { pages, setPages } = props;
  const theme = useTheme();

  const isLg = useMediaQuery(theme.breakpoints.up('xl'));
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  let titleVariant: "h3" | "h1" | "h5";
  let secondaryVariant: "body1" | "h5" | "body2";
  let imageHeight: string = '100svh';
  if (isXs) {
    imageHeight = '155svh';
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

  const handlePageChange = (path: string) => {
    const updatedPages = pages.map((page) => ({
      ...page,
      active: page.path === path,
    }));
    sessionStorage.setItem('pages', JSON.stringify(updatedPages));
    setPages(updatedPages);
  };

  return (
    <Box sx={{ backgroundColor: '#403D39', height: { sm: '100svh', xs: '155svh' } }}>
      <Container 
        maxWidth="xl"
        sx={{
          position: 'relative',
          width: '100%',
          height: { sm: '100svh', xs: '120svh'},
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
              width: '100%',
              display: { md: 'flex', xs: 'block' },
              mt: { lg: 20, md: 10, xs: 2 },
            }}
          >
            <Box 
              sx={{
                width: { lg: '40%', md: '50%', xs: '100%' },
              }}
            >
              <Box
                sx={{
                  width: 'max-content',
                  display: 'flex',
                  flexDirection: { md: 'row', xs: 'column' },
                  margin: { md: 0, xs: 'auto' },
                }}
              >
                <Link to="/albums" style={{ textDecoration: 'none' }}>
                  <Button
                    sx={{
                      backgroundColor: '#EB5E28',
                      color: '#FFFCF2',
                      p: { md: '1em 4.3em', sm: '0.5em 2.3em', xs: '0.2em 1.3em' },
                      fontFamily: 'monospace',
                      '&:hover': {
                        backgroundColor: '#C24C1E',
                      },
                    }}
                    onClick={() => handlePageChange('/albums')}
                  >
                      Top Albums
                  </Button>
                </Link>
                <Link to="/artists" style={{ textDecoration: 'none' }}>
                  <Button
                    sx={{
                      backgroundColor: '#FFFCF2',
                      color: '#403D39',
                      p: { md: '1em 4.3em', sm: '0.5em 2em', xs: '0.2em 1em' },
                      fontFamily: 'monospace',
                      '&:hover': {
                        backgroundColor: '#D0CEC6',
                      },
                      ml: { md: 4, xs: 0 },
                      mt: { md: 0, xs: 2 }
                    }}
                    onClick={() => handlePageChange('/artists')}
                  >
                    Top Artists
                  </Button>
                </Link>
              </Box>
            </Box>
            <Typography 
              variant={secondaryVariant}
              sx={{ 
                color: '#FFFCF2',
                display: 'block',
                width: { lg: '60%', md: '50%', xs: '100%' },
                fontWeight: 200,
                letterSpacing: '0.2em',
                textAlign: { md: 'right', xs: 'center' },
                mt: { md: 0, xs: 2 },
                pl: { md: '2em', xs: 0 }
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