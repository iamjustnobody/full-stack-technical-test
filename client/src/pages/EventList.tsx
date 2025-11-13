import type { Event } from "../shared/types";

import { Button } from "@/components/ui/button";
import { useEvents } from "@/hooks/useEvents";
import { FilterBar } from "@/components/features/FilterBar";
import { EventCardSkeleton } from "@/components/base/Skeleton";
import EventCard from "@/components/features/EventCard";

export default function EventList() {
  const {
    events,
    loading,
    error,
    fetchEvents,
    filter,
    setFilter,
    lastKey,
    setSearchInput,
    searchInput,
    loadingMore,
  } = useEvents(25, true);
  // autoFetch = true - fetch automatcally on filter change - no button here - could add button if prefer to manually control fetch

  const handleChange = (key: keyof typeof filter, value: string) => {
    if (key === "search") {
      setSearchInput(value);
      return;
    }
    setFilter((f) => ({ ...f, [key]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-2 pt-0 text-gray-100 dark:text-gray-100 w-full">
      <h1 className="text-xl font-bold mb-6 text-center">Upcoming Events</h1>

      <FilterBar
        filters={filter}
        searchInput={searchInput}
        onChange={handleChange}
      />

      {error && (
        <div className="text-center text-red-600 mb-4 space-y-2">
          <p className="mb-2">⚠️ {error}</p>
          <Button
            onClick={() => fetchEvents(lastKey)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </Button>
        </div>
      )}

      {loading && (
        <div className="grid sm:grid-cols-2 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!loading && !error && (
        <>
          {events.length ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {events.map((e: Event) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 mt-6">
              No events found. Try adjusting your filters.
            </p>
          )}

          {lastKey && (
            <div className="flex justify-center mt-6">
              <Button
                onClick={() => fetchEvents(lastKey)}
                disabled={loading || loadingMore}
                className="px-6 py-2 rounded 
                         bg-dark-2 hover:bg-dark-1 
                         text-gray-100 
                         disabled:opacity-50 transition"
              >
                {loadingMore ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
