import {
  ACTIVE_POLL_MS,
  formatMaintenanceWindow,
  maintenanceStateFrom,
  nextCheckDelayMs,
  UPCOMING_POLL_MS,
} from "../maintenance/schedule";
import { MaintenanceResponse } from "../models";

const now = new Date("2026-12-01T12:00:00Z");
const at = (minutes: number) => new Date(now.getTime() + minutes * 60_000).toISOString();
const res = (r: Partial<MaintenanceResponse>): MaintenanceResponse => ({
  active: false,
  title: null,
  description: null,
  ...r,
});

describe("maintenanceStateFrom", () => {
  it("is none without a response or when off", () => {
    expect(maintenanceStateFrom(null, now).kind).toBe("none");
    expect(maintenanceStateFrom(res({}), now).kind).toBe("none");
  });

  it("blocks while active", () => {
    expect(maintenanceStateFrom(res({ active: true }), now).kind).toBe("active");
    expect(maintenanceStateFrom(res({ active: true, ends_at: at(30) }), now).kind).toBe("active");
  });

  it("stops blocking once ends_at passed, even before the next check", () => {
    expect(maintenanceStateFrom(res({ active: true, ends_at: at(-1) }), now).kind).toBe("none");
  });

  it("announces an upcoming window", () => {
    const s = maintenanceStateFrom(res({ upcoming: true, starts_at: at(60), ends_at: at(120) }), now);
    expect(s.kind).toBe("upcoming");
    if (s.kind === "upcoming") {
      expect(s.startsAt.toISOString()).toBe(at(60));
      expect(s.endsAt?.toISOString()).toBe(at(120));
    }
  });

  it("ignores upcoming without a valid future start", () => {
    expect(maintenanceStateFrom(res({ upcoming: true }), now).kind).toBe("none");
    expect(maintenanceStateFrom(res({ upcoming: true, starts_at: "nonsense" }), now).kind).toBe("none");
    expect(maintenanceStateFrom(res({ upcoming: true, starts_at: at(-1) }), now).kind).toBe("none");
  });

  it("works with responses from older API versions (no schedule fields)", () => {
    expect(maintenanceStateFrom({ active: true, title: "x", description: null }, now).kind).toBe("active");
  });
});

describe("nextCheckDelayMs", () => {
  it("doesn't poll when nothing is going on", () => {
    expect(nextCheckDelayMs(null, now)).toBeNull();
    expect(nextCheckDelayMs(res({}), now)).toBeNull();
  });

  it("polls while active, and right after the end", () => {
    expect(nextCheckDelayMs(res({ active: true }), now)).toBe(ACTIVE_POLL_MS);
    expect(nextCheckDelayMs(res({ active: true, ends_at: at(0.1) }), now)).toBe(7_000);
  });

  it("polls slowly while upcoming, and right after the start", () => {
    expect(nextCheckDelayMs(res({ upcoming: true, starts_at: at(600) }), now)).toBe(UPCOMING_POLL_MS);
    expect(nextCheckDelayMs(res({ upcoming: true, starts_at: at(2) }), now)).toBe(121_000);
  });
});

describe("formatMaintenanceWindow", () => {
  it("includes both ends of the window", () => {
    const start = new Date("2026-12-05T02:00:00Z");
    const text = formatMaintenanceWindow(start, new Date("2026-12-06T04:00:00Z"), "en-GB");
    expect(text).toContain("–");
    expect(text).toMatch(/5 Dec/);
    expect(text).toMatch(/6 Dec/);
  });

  it("works without an end", () => {
    expect(formatMaintenanceWindow(new Date("2026-12-05T02:00:00Z"), null, "en-GB")).not.toContain("–");
  });
});
