import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";

import { toast } from "sonner";
import { GenericModal } from "../base/GenericModal";
import { Input } from "../ui/input";
import { useRegisterEvent } from "@/hooks/useRegisterEvent";
import { useLocalRegistrations } from "@/hooks/useLocalRegistration";

interface RegisterPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: {
    id: string;
    [key: string]: any;
  };
  mode?: "register" | "waitlist";
}

const schema = z.object({
  attendeeName: z.string().min(2, "Name required"),
  attendeeEmail: z.email("Valid email required"),
  groupSize: z.number().min(1), //.max(10),
});
export type RegisterFormData = z.infer<typeof schema>;

export function RegisterDialog({
  open,
  onOpenChange,
  event,
  mode,
}: RegisterPopupProps) {
  const [apiError, setApiError] = useState<string | null>(null);
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
    defaultValues: { attendeeName: "", attendeeEmail: "", groupSize: 1 },
  });
  const { formState } = form;
  const registerMutation = useRegisterEvent(event.id);
  const { mutate } = registerMutation;
  const { addRegistration } = useLocalRegistrations();

  const onSubmit = async (values: RegisterFormData) => {
    console.log("Submitting registration:", values);
    try {
      const res = await registerMutation.mutateAsync({
        // eventId: event.id,
        ...values,
        mode,
      });
      if (res.success) {
        addRegistration(event.id, res);
        onOpenChange(false);

        toast.error(
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
  return (
    <GenericModal
      open={open}
      onOpenChange={onOpenChange}
      title={mode === "register" ? "Register for Event" : "Join Waitlist"}
      description={`Complete the form to ${
        mode === "register" ? "register" : "join the waitlist"
      } for ${event.title}.`}
      onSubmit={form.handleSubmit(onSubmit)}
      submitLabel={registerMutation.isPending ? "Submitting..." : "Submit"}
      isSubmitting={registerMutation.isPending}
      className="bg-dark-4 text-gray-100"
    >
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
