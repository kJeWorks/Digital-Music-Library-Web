import { Artist } from "../types/ArtistType";
import { api } from "./axios";

export async function fetchAllArtists(query: string) {
  const res = await api.get<Artist[]>(`/bands?query=${query}`);
  return res.data;
}