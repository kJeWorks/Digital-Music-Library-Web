import { Song, SongDetails, SongForm, SongUpdate } from "../types/SongType";
import { api } from "./axios";

export async function createSong(song: SongForm) {
  const res = await api.post<SongDetails>('/songs', song);
  return res.data;
}

export async function deleteSong(id: number) {
  const res = await api.delete<Song>(`/songs/${id}`);
  return res.data;
}

export async function updateSong(song: SongUpdate) {
  const res = await api.patch<SongDetails>(`/songs/${song.id}`, song);
  return res.data;
}