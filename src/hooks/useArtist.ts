import { useQuery } from "@tanstack/react-query";
import { fetchArtist } from "../api/artists.api";

export default function useArtist(id: number) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['artist', { id }],
    queryFn: () => fetchArtist(id),
  });

  return { data, isLoading, isError, error };
}