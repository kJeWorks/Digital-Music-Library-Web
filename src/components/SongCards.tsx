import { Box, Button, Grid, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { Song, SongDetails, SongForm } from "../types/SongType";
import { useState } from "react";
import { MutationFunction, useMutation } from "@tanstack/react-query";
import { createSong, deleteSong } from "../api/songs.api";
import { queryClient } from "../App";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

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
  const [action, setAction] = useState<string>('');

  const { mutate: createMutate, data: createData, isPending: isPendingCreate, isError: isErrorCreate, error: errorCreate } = useMutation({
    mutationFn: createSong,
    onSuccess: (data: SongDetails) => {
      queryClient.invalidateQueries({ queryKey: ['albums', { id: albumId }] });
      if (data) {
        setSongs([...songs, data]);
      }
      setSongTitle('');
      setSongLength('');
      navigate(`/albums/${albumId}`);
    },
  });

  const { mutate: deleteMutate, data: deleteData, isPending: isPendingDelete, isError: isErrorDelete, error: errorDelete } = useMutation({
    mutationFn: deleteSong,
    onSuccess: (data: Song) => {
      queryClient.invalidateQueries({ queryKey: ['albums', { id: albumId }] });
      if (data) {
        setSongs(songs.filter((song) => song.id !== data.id));
      }
      navigate(`/albums/${albumId}`);
    }
  });

  return (
    <Grid container columnSpacing={7} rowSpacing={1}>
      {songs.map((song) => (
        <Grid key={song.id} item xs={12} sm={6} md={4} lg={3}>
          <Box sx={{ border: '2px solid #D0CEC6', borderRadius: '5px', p: 2 }}>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'end', flexDirection: 'column' }}>
              <Tooltip title="Delete">
                <IconButton onClick={() => deleteMutate(song.id)}>
                  <DeleteIcon sx={{ color: 'red' }}/>
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1" sx={{ color: '#403D39', fontWeight: 300 }}>Song Title</Typography>
              <Typography variant="body1" sx={{ color: '#403D39', fontWeight: 300 }}>Length</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" sx={{ color: '#403D39', fontWeight: 600 }}>{song.title}</Typography>
              <Typography variant="h6" sx={{ color: '#403D39', fontWeight: 600 }}>{song.length}</Typography>
            </Box>
          </Box>
        </Grid>
      ))}
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
  );
}