import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useSpeakers() {
  return useQuery({
    queryKey: [api.speakers.list.path],
    queryFn: async () => {
      const res = await fetch(api.speakers.list.path);
      if (!res.ok) throw new Error("Failed to fetch speakers");
      return api.speakers.list.responses[200].parse(await res.json());
    },
  });
}
