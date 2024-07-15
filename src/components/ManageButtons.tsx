import { Box, Button } from '@mui/material';
import { MutationFunction, QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteAlbum } from '../api/albums.api';
import { deleteArtist } from '../api/artists.api';
import { Artist } from '../types/ArtistType';
import { Album } from '../types/AlbumType';
import InfoSnackBar from './InfoSnackBar';
import { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';

type Props = {
  id: string;
  setEdit: (edit: boolean) => void;
  manageType: string;
};

export default function ManageButtons({ id, setEdit, manageType }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  let manageFn: MutationFunction<Artist | Album, number> | undefined;
  let queryKeys: QueryKey;
  let navigateTo = '';
  let deleteType: 'artist' | 'album' = useLocation().pathname.includes('artists') ? 'artist' : 'album';

  if (manageType === 'artist') {
    manageFn = deleteArtist;
    queryKeys = ['artists'];
    navigateTo = '/artists';
  } else if (manageType === 'album') {
    manageFn = deleteAlbum;
    queryKeys = ['albums'];
    navigateTo = '/albums';
  }

  const { mutate, isPending, isError } = useMutation({
    mutationFn: manageFn,
    onSuccess: () => {
      if (manageFn) {
        queryClient.invalidateQueries({ queryKey: queryKeys });
        navigate(navigateTo);
      }
    },
  });

  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={() => setEdit(true)}>
        Edit
      </Button>
      <ConfirmDialog closeFunction={() => setOpen(false)} deleteFunction={() => mutate(+id)} deleteType={deleteType} open={open}/>
      <Button
        variant="contained"
        color="secondary"
        sx={{ marginLeft: 2 }}
        onClick={() => setOpen(true)}
      >
        Delete
      </Button>
      {isPending && (
        <Box sx={{ mt: 3, color: '#403D39' }}>
          <i>Deleting in progress...</i>
        </Box>
      )}
      <InfoSnackBar message="Error happened while deleting. Please try again later" infoArrived={isError} severity='error' />
    </Box>
  );
}
