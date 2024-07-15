import { Album } from "./AlbumType";

export type Song = {
  id: number;
  title: string;
  length: string;
}

export type SongForm = {
  title: string;
  length: string;
  albumId: number;
}

export type SongDetails = {
  id: number;
  title: string;
  length: string;
  album: Album;
}