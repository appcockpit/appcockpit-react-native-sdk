import { Alert } from "react-native";
import { VersionResponse } from "../models";
import { storeDismissedVersion } from "../storageHelper";
import { openAppStore } from "./appstoreHelper";

let isAlertOpen = false;

export const showForceUpdateAlert = (
  platform: "ios" | "android",
  appstoreId: string,
  versionData: VersionResponse
) => {
  if (isAlertOpen) {
    return;
  }

  isAlertOpen = true;

  const message =
    versionData.update_message ||
    "A critical update is required. Please update to continue using the app.";

  Alert.alert(
    "Update Required",
    message,
    [
      {
        text: "Update Now",
        onPress: async () => {
          isAlertOpen = false;

          try {
            showForceUpdateAlert(platform, appstoreId, versionData);
            await openAppStore(platform, appstoreId);
          } catch (error) {
            console.error("Error opening app store:", error);
          }
        },
      },
    ],
    {
      cancelable: false,
    }
  );
};

export const showUpdateAlert = (
  appId: string,
  appstoreId: string,
  versionData: VersionResponse
) => {
  if (isAlertOpen) {
    return;
  }

  isAlertOpen = true;

  const message =
    versionData.update_message ||
    "An update is available. Please update to get the latest features and improvements.";

  Alert.alert(
    "Update Available",
    message,
    [
      {
        text: "Update Now",
        onPress: () => {
          isAlertOpen = false;
          openAppStore(versionData.platform, appstoreId);
        },
      },
      {
        text: "Later",
        style: "cancel",
        onPress: async () => {
          isAlertOpen = false;
          await storeDismissedVersion(appId, versionData.version);
        },
      },
    ],
    {
      cancelable: true,
    }
  );
};
