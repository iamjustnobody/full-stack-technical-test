import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Attendee } from "@/shared/types";
import { registerEvent } from "@/services/events";

export const useRegisterEvent = (eventId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      registerPayload: Attendee & { mode?: "register" | "waitlist" }
    ) => registerEvent(eventId, registerPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event", eventId] });
    },
    onError: (error: any) => {
      console.error("Registration failed:", error.message || error);
    },
  });
};
