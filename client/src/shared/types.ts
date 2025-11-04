export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  category: {
    id: string;
    name: string;
    color: string;
  };
  capacity: {
    max: number;
    registered: number;
  };
  pricing?: {
    individual: number;
  };
  location: {
    type: "online" | "physical";
    address?: string;
  };
}

export interface Attendee {
  attendeeEmail: string;
  attendeeName: string;
  groupSize: number;
}

export interface AttendeeResponse {
  email: string;
  name: string;
  groupSize: number;
  registeredAt: string;
}

export type RegistrationStatus = "register" | "waitlist" | null;

export const REGISTRATION_NONE: RegistrationStatus = null;
export const REGISTRATION_REGISTER: RegistrationStatus = "register";
export const REGISTRATION_WAITLIST: RegistrationStatus = "waitlist";
