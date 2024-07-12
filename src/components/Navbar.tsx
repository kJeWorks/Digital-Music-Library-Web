import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu.js';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SideDrawer from './SideDrawer';
import { PageType } from '../types/PageType';
import Logo from './Logo';
import { isEqual } from 'lodash';

type Props = {
  pages: Array<PageType>;
  setPages: (pages: Array<PageType>) => void;
};


export default function Navbar(props: Props) {
  const { pages, setPages } = props;
  const [drawerState, setDrawerState] = useState(false);
  const navigate = useNavigate();
  const path = useLocation();

  const handleOpenDrawer = () => {
    setDrawerState(true);
  };

  const handleCloseDrawer = (path: string | null) => {
    if (path) {
      handlePageChange(path);
      navigate(path);
    }
    setDrawerState(false);
  };

  const handlePageChange = (path: string) => {
    const updatedPages = pages.map((page) => ({
      ...page,
      active: page.path === path,
    }));
    sessionStorage.setItem('pages', JSON.stringify(updatedPages));
    setPages(updatedPages);
  };

  useEffect(() => {
    const updatedPages = pages.map((page, index) => ({
      ...page,
      name: pages[index].name,
    }));

    if (!isEqual(updatedPages, pages)) {
      sessionStorage.setItem('pages', JSON.stringify(updatedPages));
      setPages(updatedPages);
    }
  }, [pages]);

  return (
    <AppBar 
      position={path.pathname==="/" ? "fixed" : "static"}
      sx={{ 
        background: 
          path.pathname==="/" ? "linear-gradient(to bottom, rgba(37, 36, 34, 0.8), rgba(204, 197, 185, 0.1))" : "#FFFCF2",
        zIndex: 3,
      }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/" onClick={() => handlePageChange('/')} style={{ textDecoration: 'none', color: "black"}}>
            <Box 
              sx={{ 
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <Logo pathname={path.pathname} />
            </Box>
          </Link>

          <Container
            sx={{
              position: 'absolute',
              height: '5px',
              width: '130px',
              bottom: 0,
              display: { xs: 'none', md: 'block' },
            }}
          />

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenDrawer}
              sx={{ color: path.pathname==="/" ? "#FFFCF2" : "#403D39" }}
            >
              <MenuIcon />
            </IconButton>
            <SideDrawer
              drawerState={drawerState}
              closeDrawer={handleCloseDrawer}
              pages={pages}
            />
          </Box>

          <Link
            to="/"
            onClick={() => handlePageChange('/')}
            style={{ textDecoration: 'none', flexGrow: 1 }}
          >
            <Box 
              sx={{ 
                display: { xs: 'flex', md: 'none' },
              }}
            >
              <Logo pathname={path.pathname} />
            </Box>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'right' }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => handleCloseDrawer(page.path)}
                sx={{ 
                  my: 2, 
                  display: 'block',
                  '&:hover': {
                    color: "#EB5E28",
                    backgroundColor: "transparent"
                  }
                }}
              >
                <Typography
                  variant="body2"
                  noWrap
                  sx={{
                    fontFamily: 'monospace',
                    fontWeight: 400,
                    letterSpacing: '.5rem',
                    textDecoration: 'none',
                    color: page.active ? "#EB5E28" : path.pathname==="/" ? "#FFFCF2" : "#403D39",
                    ml: 3,
                    '&:hover': {
                      color: "#EB5E28",
                      backgroundColor: "transparent"
                    }
                  }}
                >
                  {page.name}
                </Typography>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
