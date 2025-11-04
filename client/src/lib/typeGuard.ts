import type { Attendee, AttendeeResponse } from "@/shared/types";

export function isAttendee(a: Attendee | AttendeeResponse): a is Attendee {
  return (a as Attendee).attendeeName !== undefined;
}
