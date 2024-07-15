import { Autocomplete, Box, Button, CircularProgress, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient } from "../App";
import { createAlbum } from "../api/albums.api";
import useArtists from "../hooks/useArtists";
import { Artist } from "../types/ArtistType";
import InputField from "./InputField";
import InfoSnackBar from "./InfoSnackBar";

type Props = {
  setEditMode: (editMode: boolean) => void;
}

export default function CreateAlbumForm(props: Props) {
  const { setEditMode } = props;
  const [albumTitle, setAlbumTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [artistId, setArtistId] = useState<number>(-1);
  const { mutate, isPending, isError } = useMutation({
    mutationFn: createAlbum,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['albums'] });
      setEditMode(false);
    }
  });
  const { data: artistsData, isError: isErrorArtists} = useArtists('');

  return (
    <Box width="100%" sx={{ mt: 5, display: { sm:'flex', xs: 'block' } }} >
      {
        isError && (
          <InfoSnackBar infoArrived={isError} message="Error happened when creating the album. Please try again later" severity="error"/>
        )
      }
      {
        isError && (
          <InfoSnackBar infoArrived={isErrorArtists} message="Error happened when fetching artists. Please try again later" severity="error"/>
        )
      }
      <InputField
        id="album-title"
        label="Album Title"
        sx={{
          mr: { xs: 0, sm: 3},
          width: { xs: '100%', sm: '25%' }
        }}
        setFunction={setAlbumTitle}
        value={albumTitle}
      />
      <InputField
        id="album-description"
        label="Album Description"
        sx={{
          mr: { xs: 0, sm: 3},
          width: { xs: '100%', sm: '40%' },
          mt: { xs: 3, sm: 0 }
        }}
        setFunction={setDescription}
        value={description}
      />
      <Autocomplete
        disablePortal
        id="album-artist"
        options={artistsData || []}
        sx={{ 
          width: { xs: '100%', sm: '20%' },
          mr: { xs: 0, sm: 3},
          mt: { xs: 3, sm: 0 },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: "#EB5E28",
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: "#EB5E28",
          },
        }}
        getOptionLabel={(option: Artist) => option.name}
        renderOption={(renderProps, option) => (
          <li {...renderProps}>
            <div>
              {option.name}
            </div>
          </li>
        )}
        onChange={(event, newValue) => setArtistId(newValue ? +newValue.id : -1)}
        renderInput={(params) => <TextField {...params} label="Artist" />}
      />
      {
        isPending && <CircularProgress />
      }
      <Button
        variant="contained" 
        sx={{
          backgroundColor: '#EB5E28',
          display: 'block',
          fontFamily: 'monospace',
          '&:hover': {
            backgroundColor: '#C24C1E',
          },
          width: { xs: '100%', sm: 'auto' },
          mt: { xs: 3, sm: 0 }
        }}
        onClick={() => mutate({ title: albumTitle, description, bandId: artistId })}
      >
        add album
      </Button>
    </Box>
  );
}