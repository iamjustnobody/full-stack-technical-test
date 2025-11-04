import { useParams, useNavigate } from "react-router-dom";

import { ArrowLeft, Calendar, DollarSign, MapPin, Users } from "lucide-react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useEventQuery } from "@/hooks/useEventQuery";
import { useLocalRegistrations } from "@/hooks/useLocalRegistration";
import { EventDetailSkeleton } from "@/components/base/Skeleton";
import { EventCategoryBadge } from "@/components/features/EventCategoryBadge";
import { RegisterDialog } from "@/components/features/RegisterDialog";
import { REGISTRATION_NONE, type RegistrationStatus } from "@/shared/types";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`
        bg-dark-3 p-4 text-gray-100 relative h-full 
        flex flex-col flex-1 ${className} w-full
      `}
    >
      <div
        className="
          w-full bg-dark-4 max-w-5xl mx-auto 
          p-6 rounded-md h-full shadow-md
          flex-1 flex flex-col items-center justify-around gap-4
          transition-colors duration-300
        "
      >
        {children}
      </div>
    </div>
  );
};

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: event, isLoading, error } = useEventQuery(id!);

  const { isRegistered, isInWaitlist, registered, waitlist } =
    useLocalRegistrations();
  const [open, setOpen] = useState(false);
  const [justRegistered, setJustRegistered] =
    useState<RegistrationStatus>(REGISTRATION_NONE);

  if (isLoading || !event)
    return (
      <PageWrapper>
        {isLoading ? (
          <EventDetailSkeleton />
        ) : (
          <p className="text-center p-4 text-gray-200">Event not found.</p>
        )}
      </PageWrapper>
    );

  const full = event.capacity.registered >= event.capacity.max;
  // const alreadyRegistered = isRegistered(event.id);
  // const alreadyWaitlisted = isInWaitlist(event.id);
  const alreadyRegistered =
    !!registered[event.id] || justRegistered === "register";
  const alreadyWaitlisted =
    !!waitlist[event.id] || justRegistered === "waitlist";
  // const btnLabel = already
  //   ? "Already Registered" //full ? "Joined Waitlist"  : "Already Registered"
  //   : full
  //   ? "Join Waitlist"
  //   : "Register";
  let btnLabel = "Register";
  let btnDisabled = false;

  if (alreadyRegistered) {
    btnLabel = "Already Registered";
    btnDisabled = true;
  } else if (full) {
    btnLabel = alreadyWaitlisted ? "Already in Waitlist" : "Join Waitlist";
    btnDisabled = alreadyWaitlisted;
  } else {
    btnLabel = "Register";
    btnDisabled = false;
  }

  return (
    <PageWrapper>
      {error && (
        <p className="text-center p-4 text-red-500">Error loading event.</p>
      )}

      {event && !isLoading && (
        <>
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{ color: event.category.color }}
          >
            {event.title}
          </h1>
          <EventCategoryBadge
            name={event.category.name}
            color={event.category.color}
          />

          <p className="text-gray-300 mt-4 text-center italic leading-relaxed">
            {event.description}
          </p>

          <div
            className="
          mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4
          border-t border-dark-2 pt-6 text-gray-200
        "
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <span>
                <strong>Date:</strong> {new Date(event.date).toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-400" />
              <span>
                <strong>Location:</strong>{" "}
                {event.location.type === "physical"
                  ? event.location.address
                  : "Online"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-400" />
              <span>
                <strong>Capacity:</strong> {event.capacity.registered} /{" "}
                {event.capacity.max}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-gray-400" />
              <span>
                <strong>Price:</strong> ${event.pricing?.individual}
              </span>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              className="px-6 py-3 text-lg font-medium rounded-lg bg-dark-2 hover:bg-dark-1 transition"
              onClick={() => setOpen(true)}
              disabled={btnDisabled}
            >
              {btnLabel}
            </Button>
          </div>
        </>
      )}

      <RegisterDialog
        open={open}
        onOpenChange={setOpen}
        event={event}
        mode={full ? "waitlist" : "register"}
        setJustRegistered={setJustRegistered}
      />
    </PageWrapper>
  );
}
