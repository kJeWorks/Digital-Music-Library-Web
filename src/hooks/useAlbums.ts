import { useQuery } from "@tanstack/react-query";
import { fetchAllAlbums } from "../api/albums.api";

export default function useAlbums(query: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['albums', { query: query }],
    queryFn: () => fetchAllAlbums(query),
  });

  return { data, isLoading, isError, error };
}