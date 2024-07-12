import { useQuery } from "@tanstack/react-query";
import { fetchAllArtists } from "../api/artists.api";

export default function useArtists(query: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['artists', { query: query }],
    queryFn: () => fetchAllArtists(query),
  });

  return { data, isLoading, isError, error };
}