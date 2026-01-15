import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useTalks() {
  return useQuery({
    queryKey: [api.talks.list.path],
    queryFn: async () => {
      const res = await fetch(api.talks.list.path);
      if (!res.ok) throw new Error("Failed to fetch talks");
      return api.talks.list.responses[200].parse(await res.json());
    },
  });
}
