import { useState } from "react";
import useAlbums from "../hooks/useAlbums";
import { Box, Button, CircularProgress, Container } from "@mui/material";
import SearchBox from "../components/SearchBox";
import AlbumList from "../components/AlbumList";
import { Album } from "../types/AlbumType";
import CreateAlbumForm from "../components/CreateAlbumForm";

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
      {isLoading && <CircularProgress />}
      <AlbumList albums={data as Album[]} />
    </Container>
  );
};