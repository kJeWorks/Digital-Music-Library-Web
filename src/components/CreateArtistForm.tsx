import { Box, Button, CircularProgress } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient } from "../App";
import { createArtist } from "../api/artists.api";
import InputField from "./InputField";
import InfoSnackBar from "./InfoSnackBar";

type Props = {
  setEditMode(editMode: boolean): void;
};

export default function CreateArtistForm(props: Props) {
  const { setEditMode } = props;
  const [artistName, setArtistName] = useState<string>('');
  const { mutate, data, isPending, isError } = useMutation({
    mutationFn: createArtist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artists'] });
      setEditMode(false);
    }
  });

  return (
    <Box width="100%" sx={{ mt: 5, display: { sm:'flex', xs: 'block' } }} >
      {
        isError && (
          <InfoSnackBar infoArrived={isError} message="Error happened when creating artist. Please try again later" severity="error"/>
        )
      }
      <InputField
        id="artist-name"
        label="Artist Name"
        sx={{
          mr: { xs: 0, sm: 3},
          width: { xs: '100%', sm: '50%' },
        }}
        setFunction={setArtistName}
        value={artistName}
      />
      {
        isPending && <CircularProgress />
      }
      <Button
        variant="contained" 
        sx={{ 
          mr: { xs: 0, sm: 3},
          backgroundColor: '#EB5E28',
          display: 'block',
          fontFamily: 'monospace',
          '&:hover': {
            backgroundColor: '#C24C1E',
          },
          width: { xs: '100%', sm: 'auto' },
          mt: { xs: 3, sm: 0 }
        }}
        onClick={() => mutate(artistName)}
      >
        add artist
      </Button>
    </Box>
  )
}