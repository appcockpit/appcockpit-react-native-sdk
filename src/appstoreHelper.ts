import { Alert, Linking } from "react-native";

export const openAppStore = (
  platform: "ios" | "android",
  appstoreId: string
) => {
  let storeUrl: string;

  if (platform === "ios") {
    storeUrl = `https://apps.apple.com/app/id/${appstoreId}`;
  } else {
    storeUrl = `https://play.google.com/store/apps/details?id=${appstoreId}`;
  }

  Linking.openURL(storeUrl).catch((err) => {
    Alert.alert("Error", "Could not open app store. Please update manually.", [
      { text: "OK" },
    ]);
  });
};
