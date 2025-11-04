import { API_BASE, API_KEY } from "../config";
import type { Attendee, AttendeeResponse, Event } from "../shared/types";

async function handleFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
    ...options,
  });

  let body: any = null;
  try {
    body = await res.json();
  } catch {
    body = {}; //const errMsg = await res.text();
  }

  if (!res.ok) {
    const message =
      body.message ||
      (res.status === 404
        ? "Event not found"
        : res.status === 500
        ? "Server error"
        : `Request failed (${res.status})`);

    const error = new Error(message) as Error & {
      code?: string;
      status?: number;
    };
    error.code = body.error;
    error.status = res.status;
    throw error;
  }

  return body as T;
}

export const getEvents = async <
  T = { events: any[]; lastKey?: string; total: number }
>(
  params: Record<string, string | string[] | undefined | null> = {}
): Promise<T> => {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      // handle multi-select: category=["tech","design"]
      value.forEach((v) => {
        if (
          v !== undefined &&
          v !== null &&
          v !== "" &&
          v !== "all" &&
          v !== "any"
        ) {
          searchParams.append(key, v);
        }
      });
    } else if (value !== "" && value !== "all" && value !== "any") {
      // handle normal key=value
      searchParams.append(key, value);
    }
  }

  const query = searchParams.toString();
  const url = query ? `${API_BASE}?${query}` : API_BASE;

  return handleFetch<T>(url);
};

export const getEventById = async <T = { event: Event }>(
  id: string
): Promise<T> => {
  return handleFetch<T>(`${API_BASE}/${id}`);
};

export const registerEvent = async (id: string, payload: Attendee) => {
  return handleFetch<{
    success: boolean;
    registrationId: string;
    event: Event;
    attendee: AttendeeResponse;
  }>(`${API_BASE}/${id}/register`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
