import { useQuery } from "@tanstack/react-query";
import { fetchAlbum } from "../api/albums.api";

export default function useAlbum(id: number) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['album', { id }],
    queryFn: () => fetchAlbum(id),
  });

  return { data, isLoading, isError, error };
}