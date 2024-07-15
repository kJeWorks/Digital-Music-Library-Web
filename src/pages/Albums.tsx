import { useState } from "react";
import useAlbums from "../hooks/useAlbums";
import { Box, Button, CircularProgress, Container, Typography } from "@mui/material";
import SearchBox from "../components/SearchBox";
import AlbumList from "../components/AlbumList";
import { Album } from "../types/AlbumType";
import CreateAlbumForm from "../components/CreateAlbumForm";
import InfoSnackBar from "../components/InfoSnackBar";

export default function Albums() {
  const [query, setQuery] = useState<string>('Fearless');
  const { data, isLoading, isError, error } = useAlbums(query);
  const [editMode, setEditMode] = useState<boolean>(false);

  return (
    <Container maxWidth='xl'>
      <Box width="100%" sx={{ mt: 5, display: 'flex', alignItems: 'end', flexDirection: 'column' }} >
        <Button 
          variant="contained" 
          sx={{ 
            backgroundColor: '#EB5E28',
            display: 'block',
            fontFamily: 'monospace',
            '&:hover': {
              backgroundColor: '#C24C1E',
            },
            width: { xs: '100%', sm: 'auto' }
          }}
          onClick={() => setEditMode(true)}
        >
          + add a new album
        </Button>
      </Box>
      {
        editMode && (
          <CreateAlbumForm setEditMode={setEditMode} />
        )
      }
      <SearchBox setQuery={setQuery} label="Type in an album name... (ex. Fearless)" query={query} />
      {isLoading && <CircularProgress sx={{ my: 3 }}/>}
      {isError && <InfoSnackBar message="An error occurred while fetching the data. Please try again later" infoArrived={isError} severity="error" />}
      {data && <AlbumList albums={data as Album[]} />}
      {!data && (
        <Typography variant="h5" sx={{ textAlign: 'center', mt: 2 }}>
          No albums found
        </Typography>
      )}
    </Container>
  );
};