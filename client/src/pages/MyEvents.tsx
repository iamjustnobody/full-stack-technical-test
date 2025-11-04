import EventCard from "@/components/features/EventCard";
import { useLocalRegistrations } from "@/hooks/useLocalRegistration";

export default function MyEvents() {
  const { registered, waitlist } = useLocalRegistrations();

  const registeredEvents = Object.values(registered);
  const waitlistEvents = Object.values(waitlist);

  if (!registeredEvents.length && !waitlistEvents.length)
    return (
      <p className="p-4 text-center text-gray-100">No registered events yet.</p>
    );

  return (
    <div className="max-w-4xl mx-auto p-2 pt-0 w-full">
      <h1 className="text-2xl font-bold mb-6 text-center">My Events</h1>

      {registeredEvents.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center text-green-400">
            Registered Events
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {registeredEvents.map((e) => (
              <EventCard
                key={e.event.id}
                event={e.event}
                attendee={e.attendee}
                // type="registered"
              />
            ))}
          </div>
        </>
      )}

      {waitlistEvents.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center text-yellow-400">
            Waitlist Events
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {waitlistEvents.map((e) => (
              <EventCard
                key={e.event.id}
                event={e.event}
                attendee={e.attendee}
                // type="waitlist"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
