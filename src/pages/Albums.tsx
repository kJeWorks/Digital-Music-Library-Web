import { useState } from "react";
import useAlbums from "../hooks/useAlbums";
import { CircularProgress, Container } from "@mui/material";
import SearchBox from "../components/SearchBox";
import AlbumList from "../components/AlbumList";
import { Album } from "../types/AlbumType";

export default function Albums() {
  const [query, setQuery] = useState<string>('Fearless');
  const { data, isLoading, isError, error } = useAlbums(query);

  console.log(data)
  return (
    <Container maxWidth='xl'>
      <SearchBox setQuery={setQuery} label="Type in an album name... (ex. Fearless)" query={query} />
      {isLoading && <CircularProgress />}
      <AlbumList albums={data as Album[]} />
    </Container>
  );
};