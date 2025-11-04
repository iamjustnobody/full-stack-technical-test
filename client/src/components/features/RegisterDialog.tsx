import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";

import { toast } from "sonner";
import { GenericModal } from "../base/GenericModal";
import { Input } from "../ui/input";
import { useRegisterEvent } from "@/hooks/useRegisterEvent";
import { useLocalRegistrations } from "@/hooks/useLocalRegistration";
import {
  REGISTRATION_NONE,
  REGISTRATION_REGISTER,
  REGISTRATION_WAITLIST,
  type Event,
} from "@/shared/types";

interface RegisterPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: {
    id: string;
    [key: string]: any;
  };
  mode?: "register" | "waitlist";
  setJustRegistered?: (value: "register" | "waitlist" | null) => void;
}

export function getRegisterSchema(event: Event) {
  const remainingSeats = event.capacity.max - event.capacity.registered;

  return z.object({
    attendeeName: z.string().min(2, "Name required"),
    attendeeEmail: z.email("Valid email required"),
    groupSize: z
      .number({ message: "Group size must be a number" })
      .min(1, "Group size must be at least 1")
      .max(
        remainingSeats > 0 ? remainingSeats : 1,
        `Group size cannot exceed remaining capacity (${remainingSeats})`
      ),
  });
}

export type RegisterFormData = z.infer<ReturnType<typeof getRegisterSchema>>;

export function RegisterDialog({
  open,
  onOpenChange,
  event,
  mode,
  setJustRegistered,
}: RegisterPopupProps) {
  const [apiError, setApiError] = useState<string | null>(null);
  const schema = getRegisterSchema(event as Event);
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
    defaultValues: { attendeeName: "", attendeeEmail: "", groupSize: 1 },
  });
  // const { formState } = form;
  const registerMutation = useRegisterEvent(event.id);
  // const { mutate } = registerMutation;
  const { addRegistration, addToWaitlist } = useLocalRegistrations();

  const onSubmit = async (values: RegisterFormData) => {
    console.log("Submitting registration:", values);
    try {
      const res = await registerMutation.mutateAsync({
        // eventId: event.id,
        ...values,
        mode,
      });
      if (res.success) {
        if (mode === "waitlist") {
          addToWaitlist(event.id, res);
          setJustRegistered?.(REGISTRATION_WAITLIST);
        } else {
          addRegistration(event.id, res);
          setJustRegistered?.(REGISTRATION_REGISTER);
        }
        onOpenChange(false);

        toast.success(
          mode === "register" ? "Registered 🎉" : "Added to Waitlist 🕓",
          {
            description: `You’re ${
              mode === "register" ? "registered" : "on the waitlist"
            } for ${event.title}.`,
          }
        );
      }
    } catch (err: any) {
      console.error(err);
      let message = err.message || "Something went wrong.";
      if (err.code === "EVENT_FULL") {
        message = "This event is full. You can join the waitlist instead.";
      } else if (err.code === "EVENT_NOT_FOUND") {
        message = "Event not found. Please refresh and try again.";
      }

      setApiError(message);
      toast.error("Registration failed", { description: message });
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setJustRegistered?.(REGISTRATION_NONE);
  };

  return (
    <GenericModal
      open={open}
      onOpenChange={handleClose}
      title={mode === "register" ? "Register for Event" : "Join Waitlist"}
      description={`Complete the form to ${
        mode === "register" ? "register" : "join the waitlist"
      } for ${event.title}.`}
      onSubmit={form.handleSubmit(onSubmit)}
      submitLabel={registerMutation.isPending ? "Submitting..." : "Submit"}
      isSubmitting={registerMutation.isPending}
      className="bg-dark-4 text-gray-100"
    >
      {mode === "waitlist" && (
        <div className="mb-3 rounded-md border border-yellow-500/50 bg-yellow-500/10 p-2 text-sm text-yellow-400">
          ⚠️ Note: Using the same <span className="font-medium">Register</span>{" "}
          API to simulate an <span className="italic">EVENT_FULL</span> error,
          for the waitlist flow.
        </div>
      )}
      <div className="space-y-3">
        <Input
          {...form.register("attendeeName")}
          placeholder="Your Name"
          disabled={registerMutation.isPending}
          className="bg-dark-3 text-gray-100 border-gray-600 placeholder-gray-400"
        />
        {form.formState.errors.attendeeName && (
          <p className="text-sm text-red-500">
            {form.formState.errors.attendeeName.message}
          </p>
        )}

        <Input
          {...form.register("attendeeEmail")}
          type="email"
          placeholder="Email"
          disabled={registerMutation.isPending}
          className="bg-dark-3 text-gray-100 border-gray-600 placeholder-gray-400"
        />
        {form.formState.errors.attendeeEmail && (
          <p className="text-sm text-red-500">
            {form.formState.errors.attendeeEmail.message}
          </p>
        )}

        <Input
          {...form.register("groupSize", { valueAsNumber: true })}
          type="number"
          placeholder="Group Size"
          disabled={registerMutation.isPending}
          className="bg-dark-3 text-gray-100 border-gray-600 placeholder-gray-400"
        />
        {form.formState.errors.groupSize && (
          <p className="text-sm text-red-500">
            {form.formState.errors.groupSize.message}
          </p>
        )}

        {apiError && <p className="text-sm text-red-500">{apiError}</p>}
      </div>
    </GenericModal>
  );
}
