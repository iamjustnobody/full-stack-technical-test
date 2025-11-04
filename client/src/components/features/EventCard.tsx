import type { Event, Attendee, AttendeeResponse } from "../../shared/types";

import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { EventCategoryBadge } from "./EventCategoryBadge";
import { isAttendee } from "@/lib/typeGuard";

export default function EventCard({
  event,
  attendee,
}: {
  event: Event;
  attendee?: Attendee | AttendeeResponse;
}) {
  const spotsLeft = event.capacity.max - event.capacity.registered;
  const status =
    spotsLeft <= 0 ? "Full" : spotsLeft <= 5 ? "Few spots left" : "Available";

  return (
    <Link
      to={`/events/${event.id}`}
      className="block border rounded-lg p-4  bg-dark-4 shadow-sm hover:bg-dark-3 hover:shadow-lg hover:shadow-md duration-200 transition"
      style={{ borderColor: event.category.color }}
    >
      <div className="flex justify-between items-center mb-2">
        <h3
          className="font-semibold text-lg truncate"
          style={{ color: event.category.color }}
        >
          {event.title}
        </h3>

        <EventCategoryBadge
          name={event.category.name}
          color={event.category.color}
        />
      </div>
      <p className="text-sm text-gray-400 mb-2">
        {dayjs(event.date).format("MMM D, YYYY h:mm A")}
      </p>
      <p className="text-sm text-gray-400 mb-2 capitalize">
        {event.location.type === "online"
          ? "Online Event"
          : event.location.address}
      </p>

      <p
        className={`text-sm font-medium ${
          status === "Full"
            ? "text-red-400"
            : status === "Few spots left"
            ? "text-orange-400"
            : "text-green-400"
        }`}
      >
        {status}
      </p>

      {attendee && (
        <p className="mt-1 text-sm">
          Registered as:{" "}
          {isAttendee(attendee) ? attendee.attendeeName : attendee.name}
        </p>
      )}
    </Link>
  );
}
