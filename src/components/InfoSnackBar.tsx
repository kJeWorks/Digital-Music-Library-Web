import { Alert, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close.js';
import { useEffect, useState } from 'react';

type Props = {
  message: string;
  infoArrived: boolean;
  severity: 'error' | 'info' | 'success' | 'warning';
};

export default function InfoSnackBar(props: Props) {
  const { message, infoArrived, severity } = props;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (infoArrived) {
      setOpen(true);
    }
  }, [infoArrived]);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      action={action}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant='filled'
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
