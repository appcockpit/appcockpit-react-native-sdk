import { showForceUpdateAlert, showUpdateAlert } from "./alertHelper";
import { API_BASE_URL, CLIENT_VERSION } from "./constants";
import { VersionInfo, VersionResponse } from "./models";
import { isVersionDismissed } from "./storageHelper";

export const checkVersionUpgrade = async (
  info: VersionInfo,
  apiToken: string
): Promise<void> => {
  try {
    const url = `${API_BASE_URL}/versions?app_id=${info.appId}&app_version=${info.appVersion}&platform=${info.platform}&environment=${info.environment}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-api-token": apiToken,
        "x-client-version": CLIENT_VERSION,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return void 0;
    }

    const versionData: VersionResponse = await response.json();

    if (!versionData.force_update) {
      const wasDismissed = await isVersionDismissed(
        info.appId,
        versionData.version
      );
      if (wasDismissed) {
        return;
      }
    }

    if (versionData.force_update) {
      showForceUpdateAlert(info.platform, info.appstoreId, versionData);
    } else {
      showUpdateAlert(info.appId, info.appstoreId, versionData);
    }
  } catch (error) {
    console.error("Error fetching version info:", error);
  }
};
