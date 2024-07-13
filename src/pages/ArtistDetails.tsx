import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import useArtist from "../hooks/useArtist";

export default function ArtistDetails() {
  const { id } = useParams() as { id: string };
  const { data, isLoading, isError, error } = useArtist(+id);

  console.log(data)

  return (
    <Container maxWidth="xl">
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
              <Box sx={{ backgroundColor: '#D0CEC6', p: 2 }}>
                <Typography variant="body1" sx={{ color: '#403D39', fontWeight: 300 }}>Album Title</Typography>
                <Typography variant="h6" sx={{ color: '#403D39', fontWeight: 600 }}>{album.title}</Typography>
                <Button size="small" sx={{ color: '#EB5E28' }}>See more</Button>
              </Box>
            </Grid>
          ))}
        </Grid>  
      </Box>
    </Container>
  );
};