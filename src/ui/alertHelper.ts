import { Alert } from "react-native";
import { LanguageKey, LOCALIZED_STRINGS } from "../constants";
import { VersionResponse } from "../models";
import { storeDismissedVersion } from "../storageHelper";
import { openAppStore } from "./appstoreHelper";

let isAlertOpen = false;

export const showForceUpdateAlert = (
  platform: "ios" | "android",
  appstoreId: string,
  langugageKey: LanguageKey | null,
  versionData: VersionResponse
) => {
  if (isAlertOpen) {
    return;
  }

  isAlertOpen = true;

  const alertLanguageKey = langugageKey || LanguageKey.EN;
  const strings = LOCALIZED_STRINGS[alertLanguageKey];
  const updateMessage = versionData.update_messages
    ? versionData.update_messages[alertLanguageKey] ||
      versionData.default_update_message ||
      strings.forceUpdateDescription
    : versionData.default_update_message || strings.forceUpdateDescription;

  Alert.alert(
    strings.updateRequired,
    updateMessage,
    [
      {
        text: strings.updateNow,
        onPress: async () => {
          isAlertOpen = false;

          try {
            showForceUpdateAlert(
              platform,
              appstoreId,
              langugageKey,
              versionData
            );
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
  langugageKey: LanguageKey | null,
  versionData: VersionResponse
) => {
  if (isAlertOpen) {
    return;
  }

  isAlertOpen = true;

  const alertLanguageKey = langugageKey || LanguageKey.EN;
  const strings = LOCALIZED_STRINGS[alertLanguageKey];
  const updateMessage = versionData.update_messages
    ? versionData.update_messages[alertLanguageKey] ||
      versionData.default_update_message ||
      strings.updateDescription
    : versionData.default_update_message || strings.updateDescription;

  Alert.alert(
    strings.updateAvailable,
    updateMessage,
    [
      {
        text: strings.updateNow,
        onPress: () => {
          isAlertOpen = false;
          openAppStore(versionData.platform, appstoreId);
        },
      },
      {
        text: strings.later,
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
