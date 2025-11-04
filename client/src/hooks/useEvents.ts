import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import type { Event } from "../shared/types";
import { PAGE_SIZE } from "../shared/constants";
import { getEvents } from "@/services/events";

interface Filter {
  search: string;
  category: string;
  status: string;
}

export function useEvents(limitStep = PAGE_SIZE, autoFetch = true) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastKey, setLastKey] = useState<string | undefined>(undefined);
  const lastKeyRef = useRef<string | undefined>(undefined);

  const [params, setParams] = useSearchParams();

  const [loadingMore, setLoadingMore] = useState(false);

  const initialFilter: Filter = {
    search: params.get("search") || "",
    category: params.get("category") || "", //|| "all",
    status: params.get("status") || "", //|| "any",
  };

  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [searchInput, setSearchInput] = useState(filter.search);

  useEffect(() => {
    const handler = setTimeout(
      () => setFilter((f) => ({ ...f, search: searchInput })),
      400
    );
    return () => clearTimeout(handler);
  }, [searchInput]);

  //   const navigate = useNavigate();
  //   const location = useLocation();

  //   useEffect(() => {
  //     const newParams = new URLSearchParams();
  //     if (filter.search) newParams.set("search", filter.search);
  //     if (filter.category) newParams.set("category", filter.category);
  //     if (filter.status) newParams.set("status", filter.status);
  //     // setParams(newParams, { replace: true });
  //     // const newPath = `${location.pathname}?${newParams.toString()}`;
  //   }, [filter, setParams, navigate, location.pathname, location.search]);

  const fetchEvents = useCallback(
    async (apiKey?: string | undefined) => {
      let ignore = false;
      const isLoadMore = !!apiKey;
      if (isLoadMore) setLoadingMore(true);
      else setLoading(true);
      setError(null);

      try {
        const data = await getEvents({
          search: filter.search,
          category: filter.category,
          status: filter.status,
          limit: String(limitStep),
          lastKey: apiKey!,
        });

        if (!ignore) {
          setEvents(
            (prev) => (apiKey ? [...prev, ...data.events] : data.events) //append true or false
          );
          setLastKey(data.lastKey);
          lastKeyRef.current = data.lastKey;
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (!ignore) {
          if (isLoadMore) setLoadingMore(false);
          else setLoading(false);
        }
      }

      return () => {
        ignore = true;
      };
    },
    [filter, limitStep]
  );

  useEffect(() => {
    if (!autoFetch) return;
    let cancel: (() => void) | undefined;
    (async () => {
      setLastKey(undefined);
      lastKeyRef.current = undefined;
      cancel = await fetchEvents();
    })();
    return () => cancel?.();
  }, [fetchEvents, autoFetch]);

  const fetchMore = (apiKey?: string) => {
    fetchEvents(apiKey);
  };
  const loadMore = () => {
    if (lastKey) {
      fetchEvents(lastKey);
    }
  };
  const handleLoadMore = () => {
    if (lastKeyRef.current) {
      fetchEvents(lastKeyRef.current);
    }
  };

  return {
    events,
    loading,
    searchInput,
    setSearchInput,
    filter,
    setFilter,
    loadMore,
    fetchMore,
    fetchEvents,
    error,
    lastKey,
    handleLoadMore,
    loadingMore,
  };
}
