import { useEffect, useState } from "react";

const STORAGE_KEY = "registeredEvents";

export function useLocalRegistrations() {
  const [registered, setRegistered] = useState<Record<string, any>>({});

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setRegistered(JSON.parse(saved));
  }, []);

  const addRegistration = (eventId: string, data: any) => {
    const updated = { ...registered, [eventId]: data };
    setRegistered(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const removeRegistration = (eventId: string) => {
    const updated = { ...registered };
    delete updated[eventId];
    setRegistered(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const isRegistered = (eventId: string) => !!registered[eventId];

  return { registered, addRegistration, removeRegistration, isRegistered };
}
