import { Artist } from "../types/ArtistType";
import { api } from "./axios";

export async function fetchAllArtists(query: string) {
  const res = await api.get<Artist[]>(`/bands?query=${query}`);
  return res.data;
}

export async function createArtist(artistName: string) {
  const res = await api.post<Artist>('/bands', { name: artistName});
  return res.data;
}