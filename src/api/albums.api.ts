import { Album } from "../types/AlbumType";
import { api } from "./axios";

export async function fetchAllAlbums(query: string) {
  const res = await api.get<Album[]>(`/albums?query=${query}`);
  return res.data;
}