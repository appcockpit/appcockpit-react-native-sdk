import { AppInfo } from "../models";
import { isVersionDismissed } from "../storageHelper";
import { showForceUpdateAlert, showUpdateAlert } from "../ui/alertHelper";
import { fetchVersion } from "./api";

export const checkVersionUpdate = async (info: AppInfo, apiToken: string) => {
  try {
    const response = await fetchVersion(info, apiToken);

    if (!response) {
      return;
    }

    if (!response.force_update) {
      const wasDismissed = await isVersionDismissed(
        info.appId,
        response.version
      );

      if (wasDismissed) {
        return;
      }
    }

    if (response.force_update) {
      showForceUpdateAlert(info.platform, info.appstoreId, response);
    } else {
      showUpdateAlert(info.appId, info.appstoreId, response);
    }
  } catch (error) {
    console.error("Error fetching version info:", error);
  }
};
