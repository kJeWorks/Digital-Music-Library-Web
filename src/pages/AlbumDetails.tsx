import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import useAlbum from "../hooks/useAlbum";
import ManageButtons from "../components/ManageButtons";
import { useState } from "react";

export default function AlbumDetails() {
  const { id } = useParams() as { id: string };
  const { data, isLoading, isError, error } = useAlbum(+id);
  const [editMode, setEditMode] = useState(false);

  return (
    <Container maxWidth="xl">
      <Box sx={{ width: '100%' }}>
        <ManageButtons id={id} setEdit={setEditMode} manageType="album" />
      </Box>
      <Box width="100%" sx={{ mt: 5 }}>
        <Typography
          variant="h3" 
          sx={{ 
            fontFamily: 'monospace',
            fontWeight: 500,
            textAlign: 'center',
            color: '#403D39'
          }} 
        >
          {data?.title}
        </Typography>
      </Box>
      <Box 
        width="100%" 
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          mt: 2
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <Typography variant="body2" sx={{ mt: '0.5em', mr: 1 }}>
            by
          </Typography>
          <Link to={`/artists/${data?.band.id}`} style={{ color: '#403D39', textDecoration: 'none' }}>
            <Typography variant="h6" sx={{ '&:hover': { color: '#EB5E28' } }}>
              {data?.band.name}
            </Typography>
          </Link>
        </Box>
      </Box>
      <Box width={{ sm: '50%', xs: '100%'}} sx={{ m: 'auto', mt: 2 }}>
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          {data?.description}
        </Typography>
      </Box>
      <Box width="100%" sx={{ mt: 5, mb: 5 }}>
        <Grid container columnSpacing={7} rowSpacing={1}>
          {data?.songs.map((song) => (
            <Grid key={song.id} item xs={12} sm={6} md={4} lg={3}>
              <Box sx={{ border: '2px solid #D0CEC6', borderRadius: '5px', p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" sx={{ color: '#403D39', fontWeight: 300 }}>Song Title</Typography>
                  <Typography variant="body1" sx={{ color: '#403D39', fontWeight: 300 }}>Length</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ color: '#403D39', fontWeight: 600 }}>{song.title}</Typography>
                  <Typography variant="h6" sx={{ color: '#403D39', fontWeight: 600 }}>{song.length}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>  
      </Box>
    </Container>
  );
}