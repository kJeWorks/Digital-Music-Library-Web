import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { Artist } from "../types/ArtistType"
import React from "react";

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
                  color: '#EB5E28'
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