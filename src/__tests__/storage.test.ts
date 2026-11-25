const store = new Map<string, string>();
jest.mock(
  "@react-native-async-storage/async-storage",
  () => ({
    __esModule: true,
    default: {
      setItem: async (k: string, v: string) => void store.set(k, v),
      getItem: async (k: string) => store.get(k) ?? null,
    },
  }),
  { virtual: true }
);

import {
  isMaintenanceDismissed,
  isVersionDismissed,
  storeDismissedMaintenance,
  storeDismissedVersion,
} from "../storageHelper";

beforeEach(() => store.clear());

it("remembers a dismissed version per app and version", async () => {
  await storeDismissedVersion("app", "2.0.0");
  expect(await isVersionDismissed("app", "2.0.0")).toBe(true);
  expect(await isVersionDismissed("app", "2.0.1")).toBe(false);
  expect(await isVersionDismissed("other", "2.0.0")).toBe(false);
});

it("remembers a dismissed maintenance banner per window", async () => {
  await storeDismissedMaintenance("app", "2026-12-05T02:00:00Z");
  expect(await isMaintenanceDismissed("app", "2026-12-05T02:00:00Z")).toBe(true);
  // A moved window is announced again.
  expect(await isMaintenanceDismissed("app", "2026-12-06T02:00:00Z")).toBe(false);
});
