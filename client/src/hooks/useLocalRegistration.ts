import { useEffect, useState } from "react";

const STORAGE_KEY = "events"; // store both registered & waitlist in one object

interface StoredEvents {
  registered: Record<string, any>;
  waitlist: Record<string, any>;
}

export function useLocalRegistrations() {
  const [events, setEvents] = useState<StoredEvents>({
    registered: {},
    waitlist: {},
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setEvents(JSON.parse(saved));
  }, []);

  const saveToStorage = (updated: StoredEvents) => {
    setEvents(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  // Registered events
  const addRegistration = (eventId: string, data: any) => {
    const updated = {
      ...events,
      registered: { ...events.registered, [eventId]: data },
    };
    saveToStorage(updated);
  };

  const removeRegistration = (eventId: string) => {
    const updated = {
      ...events,
      registered: { ...events.registered },
    };
    delete updated.registered[eventId];
    saveToStorage(updated);
  };

  const isRegistered = (eventId: string) => !!events.registered[eventId];

  // Waitlist events
  const addToWaitlist = (eventId: string, data: any) => {
    const updated = {
      ...events,
      waitlist: { ...events.waitlist, [eventId]: data },
    };
    saveToStorage(updated);
  };

  const removeFromWaitlist = (eventId: string) => {
    const updated = {
      ...events,
      waitlist: { ...events.waitlist },
    };
    delete updated.waitlist[eventId];
    saveToStorage(updated);
  };

  const isInWaitlist = (eventId: string) => !!events.waitlist[eventId];

  return {
    registered: events.registered,
    waitlist: events.waitlist,
    addRegistration,
    removeRegistration,
    isRegistered,
    addToWaitlist,
    removeFromWaitlist,
    isInWaitlist,
  };
}
