import { Alert } from "react-native";
import { openAppStore } from "./appstoreHelper";
import { VersionResponse } from "./models";
import { storeDismissedVersion } from "./storageHelper";

let isAlertOpen = false;

export const showForceUpdateAlert = (
  platform: "ios" | "android",
  appstoreId: string
) => {
  if (isAlertOpen) {
    return;
  }

  isAlertOpen = true;
  Alert.alert(
    "Update Required",
    "A critical update is required. Please update to continue using the app.",
    [
      {
        text: "Update Now",
        onPress: () => {
          isAlertOpen = false;

          openAppStore(platform, appstoreId);
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

  Alert.alert(
    "Update Available",
    "An update is available. Please update to get the latest features and improvements.",
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
