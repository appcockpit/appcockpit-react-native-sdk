import AsyncStorage from "@react-native-async-storage/async-storage";

const INSTALL_ID_KEY = "ac_install_id";

let cached: Promise<string | null> | null = null;

/** Random UUID v4. Not security-sensitive: it only tells installs apart. */
export const randomUUID = (): string => {
  const c = (globalThis as { crypto?: { randomUUID?: () => string } }).crypto;
  if (c?.randomUUID) return c.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (ch) => {
    const r = (Math.random() * 16) | 0;
    return (ch === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

/**
 * An anonymous ID for this app install, created on first use and kept in
 * AsyncStorage. Appcockpit uses it only to count monthly active devices; it
 * isn't derived from the device or linked to your users.
 */
export const getInstallId = (): Promise<string | null> => {
  if (!cached) {
    cached = (async () => {
      try {
        const existing = await AsyncStorage.getItem(INSTALL_ID_KEY);
        if (existing) return existing;
        const id = randomUUID();
        await AsyncStorage.setItem(INSTALL_ID_KEY, id);
        return id;
      } catch {
        return null;
      }
    })();
  }
  return cached;
};

/** Headers sent with every Appcockpit request. */
export const sdkHeaders = async (apiToken: string, clientVersion: string): Promise<Record<string, string>> => {
  const headers: Record<string, string> = {
    "x-api-token": apiToken,
    "x-client-version": clientVersion,
    "Content-Type": "application/json",
  };
  const installId = await getInstallId();
  if (installId) headers["x-install-id"] = installId;
  return headers;
};

/** For tests. */
export const resetInstallIdCache = () => {
  cached = null;
};
