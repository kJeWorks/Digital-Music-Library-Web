import { Autocomplete, Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAlbum from "../hooks/useAlbum";
import ManageButtons from "../components/ManageButtons";
import { useEffect, useState } from "react";
import useArtists from "../hooks/useArtists";
import { Artist } from "../types/ArtistType";
import { queryClient } from "../App";
import { updateAlbum } from "../api/albums.api";
import { useMutation } from "@tanstack/react-query";
import { Song } from "../types/SongType";
import SongCards from "../components/SongCards";

export default function AlbumDetails() {
  const { id } = useParams() as { id: string };
  const { data, isLoading, isError, error } = useAlbum(+id);
  const [editMode, setEditMode] = useState(false);
  const [albumName, setAlbumName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [band, setBand] = useState<Artist>({} as Artist);
  const [songs, setSongs] = useState<Song[]>([]);
  const navigate = useNavigate();
  const { data: artistsData, isError: isErrorArtists, isLoading: isLoadingArtist, error: errorArtists } = useArtists('');
  const { mutate, data: dataUpdate, isPending, isError: isErrorUpdate, error: errorUpdate } = useMutation({
    mutationFn: updateAlbum,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['album', { id }] });
      if (dataUpdate) {
        setAlbumName(dataUpdate.title);
        setDescription(dataUpdate.description);
        setBand(dataUpdate.band);
        navigate(`/albums/${dataUpdate.id}`);
      }
    }
  });

  useEffect(() => {
    if (data) {
      setAlbumName(data.title);
      setDescription(data.description);
      setBand(data.band);
      setSongs(data.songs);
    }
  }, [data]);

  const handleSubmitClick = () => {
    mutate({ id: +id, title: albumName, description, bandId: +band.id, songs });
    setEditMode(false);
  }

  const handleCancelClick = () => {
    setEditMode(false);
    setAlbumName(data?.title || '');
    setDescription(data?.description || '');
    setBand(data ? data.band : {} as Artist);
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ width: '100%', my: 5 }}>
        {
          !editMode && (
            <ManageButtons id={id} setEdit={setEditMode} manageType="album" />
          )
        }
        {
          editMode && (
            <>
              <Button onClick={handleSubmitClick}>Save Changes</Button>
              <Button variant="contained" onClick={handleCancelClick} sx={{ ml: 2 }}>Cancel</Button>
            </>
          )
        }
      </Box>
      <Box width="100%" sx={{ mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {
          editMode && (
            <TextField
              id="album-title"
              label="Album Title"
              variant="outlined"
              sx={{
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
                width: { xs: '100%', md: '30%' },
                mt: { xs: 3, md: 0 },
              }}
              onChange={(e) => {setAlbumName(e.target.value)}}
              defaultValue={albumName}
              required
            />
          )
        }
        {
          !editMode && albumName && (
            <Typography
              variant="h3" 
              sx={{ 
                fontFamily: 'monospace',
                fontWeight: 500,
                textAlign: 'center',
                color: '#403D39'
              }} 
            >
              {albumName}
            </Typography>
          )
        }
      </Box>
      <Box 
        width="100%" 
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          mt: 2
        }}
      >
        <Box sx={{ display: 'flex' }}>
          {
            !editMode && band && (
              <>
                <Typography variant="body2" sx={{ mt: '0.5em', mr: 1 }}>
                  by
                </Typography>
                <Link to={`/artists/${data?.band.id}`} style={{ color: '#403D39', textDecoration: 'none' }}>
                  <Typography variant="h6" sx={{ '&:hover': { color: '#EB5E28' } }}>
                    {band.name}
                  </Typography>
                </Link>
              </>
            )
          }
          {
            editMode && (
              <Autocomplete
                disablePortal
                id="album-artist"
                options={artistsData || []}
                sx={{
                  width: '100% !important',
                  mt: { xs: 3, md: 0 },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: "#EB5E28",
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: "#EB5E28",
                  },
                  '& .MuiInputBase-input': {
                    width: '100% !important'
                  }
                }}
                getOptionLabel={(option: Artist) => option.name}
                defaultValue={artistsData?.find((artist) => +artist.id === +band.id)}
                renderOption={(renderProps, option) => (
                  <li {...renderProps}>
                    <div>
                      {option.name}
                    </div>
                  </li>
                )}
                onChange={(event, newValue) => setBand(newValue ? newValue : {} as Artist)}
                renderInput={(params) => <TextField {...params} label="Artist" />}
              />
            )
          }
        </Box>
      </Box>
      <Box width={{ md: '50%', xs: '100%'}} sx={{ m: 'auto', mt: 2 }}>
        {
          !editMode && description && (
            <Typography variant="body2" sx={{ textAlign: 'center' }}>
              {description}
            </Typography>
          )
        }
        {
          editMode && (
            <TextField
              id="album-description"
              label="Description"
              variant="outlined"
              sx={{
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
                width: '100%',
                mt: { xs: 3, md: 0 },
              }}
              onChange={(e) => {setDescription(e.target.value)}}
              defaultValue={description}
              required
            />
          )
        }
      </Box>
      <Box width="100%" sx={{ mt: 5, mb: 5 }}>
        {
          songs && (
            <SongCards songs={songs} setSongs={setSongs} albumId={+id} />
          )
        }
      </Box>
    </Container>
  );
}