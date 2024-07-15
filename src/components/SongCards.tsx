import { Box, Button, Grid, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Song } from "../types/SongType";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createSong, deleteSong, updateSong } from "../api/songs.api";
import { queryClient } from "../App";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import InfoSnackBar from "./InfoSnackBar";
import ConfirmDialog from "./ConfirmDialog";

type Props = {
  songs: Song[];
  setSongs: (songs: Song[]) => void;
  albumId: number;
}

export default function SongCards(props: Props) {
  const { songs, setSongs, albumId } = props;
  const [songTitle, setSongTitle] = useState<string>('');
  const [songLength, setSongLength] = useState<string>('');
  const navigate = useNavigate();
  const [updateSongId, setUpdateSongId] = useState<number | null>(null);
  const [newSongName, setNewSongName] = useState<string>('');
  const [newSongLength, setNewSongLength] = useState<string>('');

  const { mutate: createMutate, data: createData, isError: isErrorCreate } = useMutation({
    mutationFn: createSong,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['albums', { id: albumId }] });
      if (createData) {
        setSongs([...songs, createData]);
      }
      setSongTitle('');
      setSongLength('');
      navigate(`/albums/${albumId}`);
    },
  });

  const { mutate: deleteMutate, data: deleteData, isError: isErrorDelete } = useMutation({
    mutationFn: deleteSong,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['albums', { id: albumId }] });
      if (deleteData) {
        setSongs(songs.filter((song) => song.id !== deleteData.id));
      }
      navigate(`/albums/${albumId}`);
    }
  });
  
  const handleCloseUpdate = () => {
    setUpdateSongId(null);
    setNewSongName('');
    setNewSongLength('');
  };

  const { mutate: updateMutate, data: updateData, isError: isErrorUpdate } = useMutation({
    mutationFn: updateSong,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['albums', { id: albumId }] });
      if (updateData) {
        const updatedSongs = songs.map((song) => {
          if (song.id === updateData.id) {
            return updateData;
          }
          return song;
        });
        setSongs(updatedSongs);
      }
      handleCloseUpdate();
      navigate(`/albums/${albumId}`);
    }
  });

  const [open, setOpen] = useState(false);

  return (
    <>
      {
        isErrorCreate && (
          <InfoSnackBar message="Song creation failed. Please try again later" severity="error" infoArrived={isErrorCreate}/>
        ) 
      }
      {
        isErrorDelete && (
          <InfoSnackBar message="Song deletion failed. Please try again later" severity="error" infoArrived={isErrorDelete}/>
        ) 
      }
      {
        isErrorUpdate && (
          <InfoSnackBar message="Song update failed. Please try again later" severity="error" infoArrived={isErrorUpdate}/>
        )
      }
      <Grid container columnSpacing={7} rowSpacing={1}>
        {
          songs.map((song) => (
            <Grid key={song.id} item xs={12} sm={6} md={4} lg={3}>
              <Box sx={{ border: '2px solid #D0CEC6', borderRadius: '5px', p: 2 }}>
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'flex-end', flexDirection: 'row' }}>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => setUpdateSongId(song.id)}>
                      <EditIcon sx={{ color: '#403D39' }}/>
                    </IconButton>
                  </Tooltip>
                  <ConfirmDialog closeFunction={() => setOpen(false)} deleteFunction={() => deleteMutate(song.id)} deleteType="song" open={open}/>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => setOpen(true)}>
                      <DeleteIcon sx={{ color: 'red' }}/>
                    </IconButton>
                  </Tooltip>
                </Box>
                {
                  updateSongId !== song.id && (
                    <>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body1" sx={{ color: '#403D39', fontWeight: 300 }}>Song Title</Typography>
                        <Typography variant="body1" sx={{ color: '#403D39', fontWeight: 300 }}>Length</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" sx={{ color: '#403D39', fontWeight: 600 }}>{song.title}</Typography>
                        <Typography variant="h6" sx={{ color: '#403D39', fontWeight: 600 }}>{song.length}</Typography>
                      </Box>
                    </>
                  )}
                {
                  updateSongId === song.id && (
                    <>
                      <Box sx={{ mt: 2 }}>
                        <InputField
                          id="album-song-new-title"
                          label="Song Title"
                          sx={{
                            width: '100%',
                            mt: { xs: 3, md: 0 },
                          }}
                          setFunction={setNewSongName}
                          value={newSongName.length ? newSongName : song.title}
                        />
                        <InputField
                          id="album-song-length"
                          label="Song length"
                          sx={{
                            width: '100%',
                            mt: 3,
                          }}
                          setFunction={setNewSongLength}
                          value={newSongLength.length > 0 ? newSongLength : song.length}
                        />
                      </Box>
                      <Box sx={{ width: '100%', mt: 2 }}>
                        <Button onClick={() => updateMutate({ id: song.id, title: newSongName, length: newSongLength })}>Update Song</Button>
                        <Button sx={{ ml: 2 }} variant="contained" onClick={handleCloseUpdate}>Cancel</Button>
                      </Box>
                    </>
                  )
                }
              </Box>
            </Grid>
          ))
        }
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box sx={{ border: '2px solid #D0CEC6', borderRadius: '5px', p: 2 }}>
            <Box>
              <TextField
                id="album-song-title"
                label="Song Title"
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
                onChange={(e) => {setSongTitle(e.target.value)}}
                value={songTitle}
                required
              />
              <TextField
                id="album-song-length"
                label="Song length"
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
                  mt: 3,
                }}
                onChange={(e) => {setSongLength(e.target.value)}}
                value={songLength}
                required
              />
            </Box>
            <Box sx={{ width: '100%', mt: 2 }}>
              <Button onClick={() => createMutate({ albumId, title: songTitle, length: songLength })}>Create Song</Button>
            </Box>
          </Box>
        </Grid>
      </Grid>  
    </>
  );
}