import { MaintenanceResponse } from "../models";

/** How often to re-check while the maintenance screen is shown. */
export const ACTIVE_POLL_MS = 30_000;
/** How often to re-check while a window is announced (it may be moved or cancelled). */
export const UPCOMING_POLL_MS = 5 * 60_000;

export type MaintenanceState =
  | { kind: "none" }
  | { kind: "active"; info: MaintenanceResponse }
  | {
      kind: "upcoming";
      info: MaintenanceResponse;
      startsAt: Date;
      endsAt: Date | null;
    };

const parse = (iso?: string | null): Date | null => {
  if (!iso) return null;
  const d = new Date(iso);
  return isNaN(d.getTime()) ? null : d;
};

/** What the app should show for a /maintenance response at `now`. */
export const maintenanceStateFrom = (
  response: MaintenanceResponse | null,
  now: Date = new Date()
): MaintenanceState => {
  if (!response) return { kind: "none" };
  const endsAt = parse(response.ends_at);
  if (response.active) {
    // Don't keep blocking past the end if the next check hasn't come back yet.
    if (endsAt && endsAt <= now) return { kind: "none" };
    return { kind: "active", info: response };
  }
  const startsAt = parse(response.starts_at);
  if (response.upcoming && startsAt && startsAt > now) {
    return { kind: "upcoming", info: response, startsAt, endsAt };
  }
  return { kind: "none" };
};

/**
 * When to check again, in ms, or null to wait for the app to come back to the
 * foreground. Checks right after a window starts or ends so the screen
 * switches on time.
 */
export const nextCheckDelayMs = (
  response: MaintenanceResponse | null,
  now: Date = new Date()
): number | null => {
  const state = maintenanceStateFrom(response, now);
  const until = (d: Date | null) =>
    d ? Math.max(d.getTime() - now.getTime() + 1_000, 1_000) : Infinity;
  switch (state.kind) {
    case "active":
      return Math.min(ACTIVE_POLL_MS, until(parse(response?.ends_at)));
    case "upcoming":
      return Math.min(UPCOMING_POLL_MS, until(state.startsAt));
    default:
      return null;
  }
};

/** "Sat, 5 Dec, 02:00 – 04:00" in the user's locale and time zone. */
export const formatMaintenanceWindow = (
  startsAt: Date,
  endsAt: Date | null,
  locale?: string
): string => {
  const dateTime: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  };
  const time: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit" };
  try {
    const start = startsAt.toLocaleString(locale, dateTime);
    if (!endsAt) return start;
    const sameDay = startsAt.toDateString() === endsAt.toDateString();
    const end = endsAt.toLocaleString(locale, sameDay ? time : dateTime);
    return `${start} – ${end}`;
  } catch {
    const iso = (d: Date) => d.toISOString().slice(0, 16).replace("T", " ") + " UTC";
    return endsAt ? `${iso(startsAt)} – ${iso(endsAt)}` : iso(startsAt);
  }
};
