import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close.js';
import { PageType } from '../types/PageType';

type Props = {
  drawerState: boolean;
  closeDrawer: (path: string | null) => void;
  pages: PageType[];
};

export default function SideDrawer(props: Props) {
  const { drawerState, closeDrawer, pages } = props;

  const setPath = (path: string | null) => {
    closeDrawer(path);
  };

  return (
    <div>
      <Drawer
        anchor="left"
        open={drawerState}
        onClose={() => setPath(null)}
      >
        <Box sx={{ width: 250 }} role="presentation" onClick={() => setPath(null)} onKeyDown={() => setPath(null)}>
          <ListItem key="close" disablePadding>
            <ListItemButton
              onClick={() => {
                setPath(null);
              }}
            >
              <ListItemText primary={"Close"} />
              <CloseIcon />
            </ListItemButton>
          </ListItem>
          <Divider />
          <List>
            {pages.map((page) => (
              <ListItem key={page.name} disablePadding>
                <ListItemButton
                  onClick={() => {
                    setPath(page.path);
                  }}
                >
                  <ListItemText primary={page.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
