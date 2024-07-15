import { Box, Button, CircularProgress, Container, Grid, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import useArtist from "../hooks/useArtist";
import { useEffect, useState } from "react";
import ManageButtons from "../components/ManageButtons";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../App";
import { updateArtist } from "../api/artists.api";
import InputField from "../components/InputField";
import InfoSnackBar from "../components/InfoSnackBar";
import { PageType } from "../types/PageType";

type Props = {
  pages: PageType[];
  setPages: (pages: PageType[]) => void;
}

export default function ArtistDetails(props: Props) {
  const { pages, setPages } = props;
  const { id } = useParams() as { id: string };
  const { data, isLoading, isError } = useArtist(+id);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [artistName, setArtistName] = useState<string>('');
  const navigate = useNavigate();

  const { mutate, data: dataUpdate, isPending, isError: isErrorUpdate } = useMutation({
    mutationFn: updateArtist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artist', { id }] });
      if (dataUpdate && !isErrorUpdate) {
        setArtistName(dataUpdate.name);
        navigate(`/artists/${dataUpdate.id}`);
      }
    }
  });

  useEffect(() => {
    if (data) {
      setArtistName(data.name);
    }
  }, [data])

  const handleClick = () => {
    mutate({ id: +id, name: artistName });
    setEditMode(false);
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
    <Container maxWidth="xl">
      {
        isLoading && (
          <CircularProgress sx={{ my: 3 }} />
        )
      }
      {
        isError && (
          <InfoSnackBar message="An error occurred while fetching the data. Please try again later" infoArrived={isError} severity="error" />
        )
      }
      {
        isErrorUpdate && (
          <InfoSnackBar message={`An error occurred while updating the artist: Incorrect or empty artist name, try entering another one`} infoArrived={isErrorUpdate} severity="error" />
        )
      }
      {
        data && (
          <>
            <Box sx={{ width: '100%', my: 5 }}>
              {
                !editMode && (
                  <ManageButtons id={id} setEdit={setEditMode} manageType="artist" />
                )
              }
              {
                isPending && (
                  <CircularProgress sx={{ mr: 3 }} />
                )
              }
              {
                editMode && (
                  <>
                    <Button onClick={handleClick}>Save Changes</Button>
                    <Button variant="contained" onClick={() => {setEditMode(false); setArtistName(data?.name || '')}} sx={{ ml: 2 }}>Cancel</Button>
                  </>
                )
              }
            </Box>
            <Box width="100%" sx={{ mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {
                editMode && (
                  <InputField
                    id="artist-name"
                    label="Artist Name"
                    sx={{
                      width: { xs: '100%', md: '30%' },
                      mt: { xs: 3, md: 0 },
                    }}
                    setFunction={setArtistName}
                    value={artistName}
                  />
                )
              }
              {
                !editMode && data.name && (
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontFamily: 'monospace',
                      fontWeight: 500,
                      textAlign: 'center',
                      color: '#403D39'
                    }} 
                  >
                    {data.name}
                  </Typography>
                )
              }
            </Box>
        
            <Box width="100%" sx={{ mt: 5, mb: 5 }}>
              <Grid container columnSpacing={7} rowSpacing={1}>
                {data?.albums.map((album) => (
                  <Grid key={album.id} item xs={12} sm={6} md={4} lg={3}>
                    <Box 
                      sx={{ 
                        border: '2px solid #D0CEC6', 
                        borderRadius: '5px', 
                        p: 2,
                        '&:hover': {
                          borderColor: '#EB5E28',
                          transition: 'border-color 0.5s',
                        }
                      }}
                    >
                      <Typography variant="body1" sx={{ color: '#403D39', fontWeight: 300 }}>Album Title</Typography>
                      <Typography variant="h6" sx={{ color: '#403D39', fontWeight: 600 }}>{album.title}</Typography>
                      <Link to={`/albums/${album.id}`} style={{ textDecoration: 'none' }}>
                        <Button onClick={() => handlePageChange('/albums')} size="small" sx={{ color: '#EB5E28' }}>
                          View Album
                        </Button>
                      </Link>
                    </Box>
                  </Grid>
                ))}
              </Grid>  
            </Box>
          </>
        )
      }
      {!data && (
        <Typography variant="h5" sx={{ textAlign: 'center', my: 2 }}>
          Artist not found
        </Typography>
      )}
    </Container>
  );
};