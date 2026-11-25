jest.mock(
  "@react-native-async-storage/async-storage",
  () => require("./asyncStorageMock").asyncStorageMock,
  { virtual: true }
);
import { store } from "./asyncStorageMock";

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

import { getInstallId, resetInstallIdCache } from "../installId";

it("creates one install ID and keeps it", async () => {
  resetInstallIdCache();
  const id = await getInstallId();
  expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  expect(store.get("ac_install_id")).toBe(id);
  resetInstallIdCache();
  expect(await getInstallId()).toBe(id); // read back after a restart
});
