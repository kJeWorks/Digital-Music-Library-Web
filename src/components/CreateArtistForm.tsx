import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient } from "../App";
import { createArtist } from "../api/artists.api";

type Props = {
  setEditMode(editMode: boolean): void;
};

export default function CreateArtistForm(props: Props) {
  const { setEditMode } = props;
  const [artistName, setArtistName] = useState<string>('');
  const { mutate, data, isPending, isError, error } = useMutation({
    mutationFn: createArtist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artists'] });
      setEditMode(false);
    }
  });

  return (
    <Box width="100%" sx={{ mt: 5, display: 'flex' }} >
      <TextField
        id="artist-name"
        label="Artist Name"
        variant="outlined"
        sx={{
          mr: 3,
          width: '50%',
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
        }}
        onChange={(e) => setArtistName(e.target.value)}
        defaultValue={artistName}
      />
      {
        isPending && <CircularProgress />
      }
      <Button
        variant="contained" 
        sx={{ 
          mr: 3,
          backgroundColor: '#EB5E28',
          display: 'block',
          fontFamily: 'monospace',
          '&:hover': {
            backgroundColor: '#C24C1E',
          },
        }}
        onClick={() => mutate(artistName)}
      >
        add artist
      </Button>
    </Box>
  )
}