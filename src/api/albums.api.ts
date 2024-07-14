import { Album, AlbumDetails } from "../types/AlbumType";
import { api } from "./axios";

export async function fetchAllAlbums(query: string) {
  const res = await api.get<Album[]>(`/albums?query=${query}`);
  return res.data;
}

export async function fetchAlbum(id: number) {
  const res = await api.get<AlbumDetails>(`/albums/${id}`);
  return res.data;
}