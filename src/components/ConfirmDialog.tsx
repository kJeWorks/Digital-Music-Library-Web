import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

type Props = {
  closeFunction: (open: boolean) => void;
  open: boolean;
  deleteType: 'album' | 'artist' | 'song';
  deleteFunction: () => void;
}

export default function ConfirmDialog(props: Props) {
  const { closeFunction, open, deleteType, deleteFunction } = props;

  const handleClose = () => {
    closeFunction(false);
  };

  const handleDelete = () => {
    deleteFunction();
    handleClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {`Are you sure you want to delete this ${deleteType}?`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          By deleting this {deleteType}, you will not be able to recover it.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};