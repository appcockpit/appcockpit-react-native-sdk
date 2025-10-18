import { FC, PropsWithChildren } from "react";
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { VersionResponse } from "../models";

export type UpdateButtonTheme = {
  backgroundColor?: string;
  textColor?: string;
};

export type Props = PropsWithChildren<{
  visible: boolean;
  versionInfo: VersionResponse;
  theme?: {
    updateButton?: UpdateButtonTheme;
  };
  onClose: () => void;
  onUpdate: () => void;
}>;

export const AppUpdateScreen: FC<Props> = ({
  visible,
  versionInfo,
  theme,
  children,
  onClose,
  onUpdate,
}) => {
  const defaultTitle = versionInfo.force_update
    ? "Update Required"
    : "Update Available";

  const defaultDescription = versionInfo.force_update
    ? `A critical update is required to continue using the app.`
    : `A new version is available. Update now to get the latest features and improvements.`;

  return (
    <>
      {children}
      <Modal
        visible={visible}
        animationType="slide"
        onRequestClose={versionInfo.force_update ? undefined : onClose}
      >
        <SafeAreaView style={styles.fullScreen}>
          <View style={styles.topContent}>
            <Text style={styles.title}>{defaultTitle}</Text>

            <Text style={styles.description}>
              {versionInfo.update_message || defaultDescription}
            </Text>
          </View>

          <View style={styles.bottomContent}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.updateButton,
                  theme?.updateButton && {
                    backgroundColor: theme.updateButton.backgroundColor,
                  },
                ]}
                onPress={onUpdate}
              >
                <Text
                  style={[
                    styles.updateButtonText,
                    theme?.updateButton && {
                      color: theme.updateButton.textColor,
                    },
                  ]}
                >
                  {"Update now"}
                </Text>
              </TouchableOpacity>

              {!versionInfo.force_update && (
                <TouchableOpacity
                  style={[styles.button, styles.laterButton]}
                  onPress={onClose}
                >
                  <Text style={styles.laterButtonText}>{"Later"}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  topContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 40,
  },
  appIcon: {
    width: 120,
    height: 120,
    borderRadius: 24,
  },
  defaultIcon: {
    width: 120,
    height: 120,
    borderRadius: 24,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  forceText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  versionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
  },
  versionText: {
    fontSize: 16,
    color: "#666",
    fontFamily: "monospace",
  },
  versionArrow: {
    fontSize: 18,
    color: "#007AFF",
    marginHorizontal: 16,
    fontWeight: "bold",
  },
  newVersion: {
    color: "#007AFF",
    fontWeight: "600",
  },
  description: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    lineHeight: 26,
    paddingHorizontal: 8,
  },
  bottomContent: {
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  buttonContainer: {
    width: "100%",
    gap: 16,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: "center",
  },
  updateButton: {
    backgroundColor: "#007AFF",
  },
  updateButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  laterButton: {
    backgroundColor: "transparent",
    paddingVertical: 8,
  },
  laterButtonText: {
    color: "#666",
    fontSize: 18,
    fontWeight: "500",
  },
});
