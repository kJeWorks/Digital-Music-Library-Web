import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { Artist } from "../types/ArtistType"
import { Link } from "react-router-dom";
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
                primary={
                  <React.Fragment>
                    <Link 
                      to={`/artists/${artist.id}`} 
                      style={{ 
                        textDecoration: 'none', 
                      }}
                      >
                      <Typography
                        sx={{
                          fontFamily: 'monospace',
                          color: '#403D39',
                        }}
                      >
                        {artist.name}
                      </Typography>
                    </Link>
                  </React.Fragment>
                }
              sx={{ 
                mt: 2, 
                '& :hover': {
                  color: '#EB5E28',
                  cursor: 'pointer'
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