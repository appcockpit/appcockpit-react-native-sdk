import AsyncStorage from "@react-native-async-storage/async-storage";

export const getDismissedVersionKey = (appId: string, version: string) =>
  `ac_dismissed_version_${appId}_${version}`;

export const storeDismissedVersion = async (appId: string, version: string) => {
  try {
    const key = getDismissedVersionKey(appId, version);
    await AsyncStorage.setItem(key, "true");
  } catch (error) {
    console.error("Failed to store dismissed version:", error);
  }
};

export const isVersionDismissed = async (
  appId: string,
  version: string
): Promise<boolean> => {
  try {
    const key = getDismissedVersionKey(appId, version);
    const value = await AsyncStorage.getItem(key);
    return value === "true";
  } catch (error) {
    console.error("Failed to check dismissed version:", error);
    return false;
  }
};
