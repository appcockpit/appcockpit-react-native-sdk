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

// A dismissed maintenance banner stays hidden for that window only: a new or
// moved window (different start time) is announced again.
export const getDismissedMaintenanceKey = (appId: string, startsAt: string) =>
  `ac_dismissed_maintenance_${appId}_${startsAt}`;

export const storeDismissedMaintenance = async (appId: string, startsAt: string) => {
  try {
    await AsyncStorage.setItem(getDismissedMaintenanceKey(appId, startsAt), "true");
  } catch (error) {
    console.error("Failed to store dismissed maintenance banner:", error);
  }
};

export const isMaintenanceDismissed = async (
  appId: string,
  startsAt: string
): Promise<boolean> => {
  try {
    return (await AsyncStorage.getItem(getDismissedMaintenanceKey(appId, startsAt))) === "true";
  } catch (error) {
    console.error("Failed to check dismissed maintenance banner:", error);
    return false;
  }
};
