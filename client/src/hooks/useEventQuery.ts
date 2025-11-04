import { getEventById } from "@/services/events";
import { useQuery } from "@tanstack/react-query";

export const useEventQuery = (id: string) => {
  return useQuery({
    queryKey: ["event", id],
    // queryFn: () => getEventById(id),
    queryFn: async () => {
      const data = await getEventById(id); // data: { event: Event }
      return data.event;
    },
    enabled: !!id,
    // suspense: true,
    // useErrorBoundary: true,
  });
};
