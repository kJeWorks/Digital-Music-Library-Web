import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageType } from '../types/PageType';

type Props = {
  pages: PageType[];
  setPages: (pages: PageType[]) => void;
};

export default function Error(props: Props) {
  const { pages, setPages } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const updatedPages = pages.map((page) => ({
        ...page,
        active: page.path === '/',
      }));
      sessionStorage.setItem('pages', JSON.stringify(updatedPages));
      setPages(updatedPages);
      navigate('/');
    }, 5000);
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <>
      <Typography variant="h2" textAlign="center" marginTop={10} sx={{ color: '#403D39' }}>
        The page you are looking for does not exist
      </Typography>
      <Typography variant="h6" textAlign="center" marginTop={2} sx={{ color: '#403D39' }}>
        Redirecting to the home page in 5 seconds...
      </Typography>
    </>
  );
}
