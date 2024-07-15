import { Artist } from "./ArtistType";
import { Song } from "./SongType";

export type Album = {
  id: string;
  title: string;
  band: Artist;
}

export type AlbumDetails = {
  id: string;
  title: string;
  band: Artist;
  description: string;
  songs: Song[];
}

export type AlbumForm = {
  title: string;
  description: string;
  bandId: number;
}

export type AlbumUpdate = {
  id: number;
  title: string;
  description: string;
  bandId: number;
  songs: Song[];
}