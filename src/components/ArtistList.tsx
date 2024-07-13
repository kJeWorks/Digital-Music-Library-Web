import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Artist } from "../types/ArtistType"

type Props = {
  artists: Array<Artist>;
}

export default function ArtistList(props: Props) {
  const { artists } = props;

  return (
    <List sx={{ width: '100%', maxWidth: '100%', mt: 5 }}>
      {
        artists?.map((artist: Artist) => (
          <Box key={artist.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="artist-logo" src="/artist.png" />
              </ListItemAvatar>
              <ListItemText
                primary={artist.name}
                sx={{
                  fontFamily: 'monospace',
                  color: '#403D39',
                  '& :hover': {
                    color: '#EB5E28',
                    cursor: 'pointer'
                  },
                  mt: 2
                }}
              />
            </ListItem>
            <Divider variant="inset" component="li"/>
          </Box>
        ))
      }
    </List>
  );
}