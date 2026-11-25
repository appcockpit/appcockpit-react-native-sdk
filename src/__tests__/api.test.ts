jest.mock(
  "@react-native-async-storage/async-storage",
  () => require("./asyncStorageMock").asyncStorageMock,
  { virtual: true }
);

import { getMaintenanceMode } from "../maintenance/maintenance";
import { fetchVersion } from "../versions/api";
import { authenticate } from "../authenticate/api";
import { API_BASE_URL, CLIENT_VERSION } from "../constants";

const mockFetch = jest.fn();
beforeEach(() => {
  mockFetch.mockReset();
  (global as any).fetch = mockFetch;
  jest.spyOn(console, "error").mockImplementation(() => {});
});

const ok = (body: unknown) => ({ ok: true, json: async () => body });

describe("getMaintenanceMode", () => {
  it("calls the v2 endpoint with token and client version", async () => {
    const body = { active: false, upcoming: true, starts_at: "2026-12-05T02:00:00Z", title: "DB", description: null };
    mockFetch.mockResolvedValue(ok(body));
    const res = await getMaintenanceMode({ appId: "app1", environment: "production" }, "tok");
    expect(res).toEqual(body);
    const [url, init] = mockFetch.mock.calls[0];
    expect(url).toBe(`${API_BASE_URL}/v2/maintenance?app_id=app1&environment=production`);
    expect(init.headers["x-api-token"]).toBe("tok");
    expect(init.headers["x-client-version"]).toBe(CLIENT_VERSION);
    expect(init.headers["x-install-id"]).toMatch(/^[0-9a-f-]{36}$/);
  });

  it("returns null on HTTP errors and network failures", async () => {
    mockFetch.mockResolvedValue({ ok: false });
    expect(await getMaintenanceMode({ appId: "a", environment: "p" }, "t")).toBeNull();
    mockFetch.mockRejectedValue(new Error("offline"));
    expect(await getMaintenanceMode({ appId: "a", environment: "p" }, "t")).toBeNull();
  });
});

describe("fetchVersion", () => {
  it("sends app, version, platform and environment", async () => {
    mockFetch.mockResolvedValue(ok({ version: "2.0.0", platform: "ios", force_update: true, default_update_message: null }));
    const info = { platform: "ios" as const, appId: "a", appstoreId: "1", appVersion: "1.0.0", environment: "production" };
    const res = await fetchVersion(info, "t");
    expect(res?.force_update).toBe(true);
    expect(mockFetch.mock.calls[0][0]).toBe(
      `${API_BASE_URL}/v2/versions?app_id=a&app_version=1.0.0&platform=ios&environment=production`
    );
  });

  it("returns null when there's no update", async () => {
    mockFetch.mockResolvedValue({ ok: false });
    const info = { platform: "android" as const, appId: "a", appstoreId: "x", appVersion: "1", environment: "p" };
    expect(await fetchVersion(info, "t")).toBeNull();
  });
});

describe("authenticate", () => {
  it("posts the user", async () => {
    mockFetch.mockResolvedValue(ok({ success: true }));
    const info = { platform: "ios" as const, appId: "a", appstoreId: "1", appVersion: "1.2.3", environment: "production" };
    await authenticate(info, "t", "user-1");
    const [url, init] = mockFetch.mock.calls[0];
    expect(url).toBe(`${API_BASE_URL}/v2/authenticate`);
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body)).toEqual({ user_id: "user-1", platform: "ios", app_version: "1.2.3", environment: "production" });
  });
});
