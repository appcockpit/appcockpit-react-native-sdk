// Shared in-memory AsyncStorage for tests.
export const store = new Map<string, string>();
export const asyncStorageMock = {
  __esModule: true,
  default: {
    setItem: async (k: string, v: string) => void store.set(k, v),
    getItem: async (k: string) => store.get(k) ?? null,
  },
};
