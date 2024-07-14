import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import useArtist from "../hooks/useArtist";
import { useState } from "react";
import ManageButtons from "../components/ManageButtons";

export default function ArtistDetails() {
  const { id } = useParams() as { id: string };
  const { data, isLoading, isError, error } = useArtist(+id);
  const [editMode, setEditMode] = useState(false);

  return (
    <Container maxWidth="xl">
      <Box sx={{ width: '100%' }}>
        <ManageButtons id={id} setEdit={setEditMode} manageType="artist" />
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
          {data?.name}
        </Typography>
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