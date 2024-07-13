import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { Album } from "../types/AlbumType";
import React from "react";

type Props = {
  albums: Array<Album>;
}

export default function AlbumList(props: Props) {
  const { albums } = props;

  return (
    <List sx={{ width: '100%', maxWidth: '100%', mt: 5 }}>
      {
        albums?.map((album: Album) => (
          <Box key={album.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="artist-logo" src="/album.png" />
              </ListItemAvatar>
              <ListItemText
                primary={album.title}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="#403D39"
                    >
                      {album.band.name}
                    </Typography>
                  </React.Fragment>
                }
                sx={{
                  fontFamily: 'monospace',
                  color: '#403D39',
                  '& :hover': {
                    color: '#EB5E28',
                    cursor: 'pointer'
                  },
                  '& .MuiListItemText-primary': {
                    fontWeight: 700
                  },
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