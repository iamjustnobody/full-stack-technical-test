import EventCard from "@/components/features/EventCard";
import { useLocalRegistrations } from "@/hooks/useLocalRegistration";

export default function MyEvents() {
  const { registered } = useLocalRegistrations();
  const events = Object.values(registered);

  if (!events.length)
    return <p className="p-4 text-center">No registered events.</p>;

  return (
    <div className="max-w-4xl mx-auto p-2 pt-0 w-full">
      <h1 className="text-2xl font-bold mb-6 text-center">
        My Registered Events
      </h1>
      {events.length === 0 ? (
        <p className="text-center text-gray-500">No registered events yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {events.map((e) => (
            <EventCard key={e.event.id} event={e.event} attendee={e.attendee} />
          ))}
        </div>
      )}
    </div>
  );
}
