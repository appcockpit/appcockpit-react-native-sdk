import { FC } from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { formatMaintenanceWindow } from "../maintenance/schedule";
import { MaintenanceResponse } from "../models";

export type MaintenanceBannerTheme = {
  backgroundColor?: string;
  titleColor?: string;
  messageColor?: string;
};

export type MaintenanceBannerProps = {
  maintenanceInfo: MaintenanceResponse;
  startsAt: Date;
  endsAt: Date | null;
  onDismiss: () => void;
};

type Props = MaintenanceBannerProps & {
  theme?: MaintenanceBannerTheme;
  locale?: string;
};

/** Slim banner at the top of the app announcing a scheduled maintenance window. */
export const MaintenanceBanner: FC<Props> = ({
  maintenanceInfo,
  startsAt,
  endsAt,
  onDismiss,
  theme,
  locale,
}) => {
  const title = maintenanceInfo.title || "Scheduled maintenance";
  const when = formatMaintenanceWindow(startsAt, endsAt, locale);

  return (
    <SafeAreaView pointerEvents="box-none" style={styles.container}>
      <View
        accessibilityRole="alert"
        style={[styles.banner, theme?.backgroundColor ? { backgroundColor: theme.backgroundColor } : null]}
      >
        <View style={styles.text}>
          <Text style={[styles.title, theme?.titleColor ? { color: theme.titleColor } : null]} numberOfLines={1}>
            {title}
          </Text>
          <Text style={[styles.message, theme?.messageColor ? { color: theme.messageColor } : null]} numberOfLines={2}>
            {when}
            {maintenanceInfo.description ? ` · ${maintenanceInfo.description}` : ""}
          </Text>
        </View>
        <TouchableOpacity
          onPress={onDismiss}
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          style={styles.close}
        >
          <Text style={[styles.closeText, theme?.messageColor ? { color: theme.messageColor } : null]}>✕</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight ?? 0 : 0,
  },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 12,
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: "#1F2937",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  text: { flex: 1 },
  title: { color: "#FFFFFF", fontSize: 14, fontWeight: "600" },
  message: { color: "#D1D5DB", fontSize: 13, marginTop: 2 },
  close: { marginLeft: 12, padding: 2 },
  closeText: { color: "#D1D5DB", fontSize: 16 },
});
