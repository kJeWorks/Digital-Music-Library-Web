import { Album, AlbumDetails, AlbumForm } from "../types/AlbumType";
import { api } from "./axios";

export async function fetchAllAlbums(query: string) {
  const res = await api.get<Album[]>(`/albums?query=${query}`);
  return res.data;
}

export async function fetchAlbum(id: number) {
  const res = await api.get<AlbumDetails>(`/albums/${id}`);
  return res.data;
}

export async function createAlbum(album: AlbumForm) {
  const res = await api.post<AlbumForm>('/albums', album);
  return res.data;
}

export async function deleteAlbum(id: number) {
  const res = await api.delete<Album>(`/albums/${id}`);
  return res.data;
}