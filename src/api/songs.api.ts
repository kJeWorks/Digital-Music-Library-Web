import { Song, SongDetails, SongForm } from "../types/SongType";
import { api } from "./axios";

export async function createSong(song: SongForm) {
  const res = await api.post<SongDetails>('/songs', song);
  return res.data;
}

export async function deleteSong(id: number) {
  const res = await api.delete<Song>(`/songs/${id}`);
  return res.data;
}