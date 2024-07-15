import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { Album } from "../types/AlbumType";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  albums: Array<Album>;
  handlePageChange: (page: string) => void;
}

export default function AlbumList(props: Props) {
  const { albums, handlePageChange } = props;

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
                primary={
                  <React.Fragment>
                    <Link to={`/albums/${album.id}`} style={{ textDecoration: 'none' }}>
                      <Typography 
                        sx={{
                          fontFamily: 'monospace',
                          color: '#403D39',
                          fontWeight: 700,
                          letterSpacing: '0.1em'
                        }}
                      >
                        {album.title}
                      </Typography>
                    </Link>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Link onClick={() => handlePageChange('/artists')} to={`/artists/${album.band.id}`} style={{ textDecoration: 'none' }}>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="#403D39"
                      >
                        {album.band.name}
                      </Typography>
                    </Link>
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