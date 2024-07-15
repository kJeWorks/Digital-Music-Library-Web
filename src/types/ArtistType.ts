import { Album } from "./AlbumType";

export type Artist = {
  id: string;
  name: string;
}

export type ArtistDetails = {
  id: string;
  name: string;
  albums: Album[];
}