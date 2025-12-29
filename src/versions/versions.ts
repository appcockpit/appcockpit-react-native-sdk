import { LanguageKey } from "../constants";
import { AppInfo } from "../models";
import { isVersionDismissed } from "../storageHelper";
import { showForceUpdateAlert, showUpdateAlert } from "../ui/alertHelper";
import { fetchVersion } from "./api";

export const checkVersionUpdate = async (
  info: AppInfo,
  apiToken: string,
  langugageKey?: LanguageKey | null
) => {
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
      showForceUpdateAlert(
        info.platform,
        info.appstoreId,
        langugageKey || null,
        response
      );
    } else {
      showUpdateAlert(
        info.appId,
        info.appstoreId,
        langugageKey || null,
        response
      );
    }
  } catch (error) {
    console.error("Error fetching version info:", error);
  }
};
