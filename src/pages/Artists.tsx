import { Container, TextField } from "@mui/material";
import useArtists from "../hooks/useArtists";
import { useState } from "react";

export default function Artists() {
  const [query, setQuery] = useState<string>('Rammstein');
  const { data, isLoading, isError, error } = useArtists(query);

  console.log(data)
  return (
    <Container maxWidth='xl'>
      <TextField
        id="standard-basic" 
        label="Type in an artist name... (ex. Rammstein)" 
        variant="standard"
        sx={{
          mt: 5,
          '& .MuiFormLabel-root': {
            color: "#403D39",
          },
          '& .MuiInput-root .MuiInput-input': {
            color: "#403D39",
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: "#EB5E28",
          },
          '& .MuiInput-underline:before': {
            borderColor: "#403D39",
          },
          '& .MuiInput-underline:after': {
            borderColor: "#EB5E28",
          },
        }}
        fullWidth
        onChange={(e) => setQuery(e.target.value)}
      />
    </Container>
  ) 
}