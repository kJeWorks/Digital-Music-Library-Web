import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import useArtist from "../hooks/useArtist";
import { useEffect, useState } from "react";
import ManageButtons from "../components/ManageButtons";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../App";
import { updateArtist } from "../api/artists.api";

export default function ArtistDetails() {
  const { id } = useParams() as { id: string };
  const { data, isLoading, isError, error } = useArtist(+id);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [artistName, setArtistName] = useState<string>('');

  const { mutate, data: dataUpdate, isPending, isError: isErrorUpdate, error: errorUpdate } = useMutation({
    mutationFn: updateArtist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artist', { id }] });
      if (dataUpdate) {
        setArtistName(dataUpdate.name);
        navigate(`/artists/${dataUpdate.id}`);
      }
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setArtistName(data.name);
    }
  }, [data])

  const handleClick = () => {
    mutate({ id: +id, name: artistName });
    setEditMode(false);
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ width: '100%', my: 5 }}>
        {
          !editMode && (
            <ManageButtons id={id} setEdit={setEditMode} manageType="artist" />
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
            <TextField
              id="artist-name"
              label="Artist Name"
              variant="outlined"
              sx={{
                '& .MuiFormLabel-root': {
                  color: "#403D39",
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: "#EB5E28",
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: "#403D39",
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: "#EB5E28",
                },
                width: { xs: '100%', md: '30%' },
                mt: { xs: 3, md: 0 },
              }}
              onChange={(e) => {setArtistName(e.target.value)}}
              defaultValue={artistName}
              required
            />
          )
        }
        {
          !editMode && artistName && (
            <Typography 
              variant="h3" 
              sx={{ 
                fontFamily: 'monospace',
                fontWeight: 500,
                textAlign: 'center',
                color: '#403D39'
              }} 
            >
              {artistName}
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
                  <Button size="small" sx={{ color: '#EB5E28' }}>
                    View Album
                  </Button>
                </Link>
              </Box>
            </Grid>
          ))}
        </Grid>  
      </Box>
    </Container>
  );
};