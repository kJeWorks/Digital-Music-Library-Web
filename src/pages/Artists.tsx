import { CircularProgress, Container, TextField } from "@mui/material";
import useArtists from "../hooks/useArtists";
import { useState } from "react";
import ArtistList from "../components/ArtistList";
import { Artist } from "../types/ArtistType";
import SearchBox from "../components/SearchBox";

export default function Artists() {
  const [query, setQuery] = useState<string>('Rammstein');
  const { data, isLoading, isError, error } = useArtists(query);

  return (
    <Container maxWidth='xl'>
      <SearchBox  setQuery={setQuery} label="Type in an artist name... (ex. Rammstein)" />
      {isLoading && <CircularProgress />}
      <ArtistList artists={data as Artist[]} />
    </Container>
  ) 
}