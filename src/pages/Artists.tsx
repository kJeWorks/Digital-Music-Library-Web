import { Avatar, Box, Button, CircularProgress, Container, Divider, List, ListItem, ListItemAvatar, ListItemText, TextField } from "@mui/material";
import useArtists from "../hooks/useArtists";
import { useState } from "react";
import ArtistList from "../components/ArtistList";
import { Artist } from "../types/ArtistType";
import SearchBox from "../components/SearchBox";
import CreateArtistForm from "../components/CreateArtistForm";

export default function Artists() {
  const [query, setQuery] = useState<string>('Rammstein');
  const { data, isLoading, isError, error } = useArtists(query);
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
          + add a new artist
        </Button>
      </Box>
      {editMode && (
        <CreateArtistForm setEditMode={setEditMode} />
      )}
      <SearchBox  setQuery={setQuery} label="Type in an artist name... (ex. Rammstein)" query={query} />
      {isLoading && <CircularProgress />}
      <ArtistList artists={data as Artist[]} />
    </Container>
  ) 
}