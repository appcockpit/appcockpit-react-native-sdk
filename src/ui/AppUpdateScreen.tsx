import { FC, PropsWithChildren } from "react";
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LanguageKey, LOCALIZED_STRINGS } from "../constants";
import { VersionResponse } from "../models";

export type UpdateButtonTheme = {
  backgroundColor?: string;
  textColor?: string;
};

export type Props = PropsWithChildren<{
  visible: boolean;
  versionInfo: VersionResponse;
  languageKey?: LanguageKey;
  theme?: {
    updateButton?: UpdateButtonTheme;
  };
  onClose: () => void;
  onUpdate: () => void;
}>;

export const AppUpdateScreen: FC<Props> = ({
  visible,
  versionInfo,
  languageKey,
  theme,
  children,
  onClose,
  onUpdate,
}) => {
  const activeLanguageKey = languageKey || LanguageKey.EN;
  const strings = LOCALIZED_STRINGS[activeLanguageKey];

  const title = versionInfo.force_update
    ? strings.updateRequired
    : strings.updateAvailable;

  const defaultDescription = versionInfo.force_update
    ? strings.forceUpdateDescription
    : strings.updateDescription;

  const updateMessage =
    versionInfo.update_messages && languageKey
      ? versionInfo.update_messages[languageKey] ||
        versionInfo.default_update_message ||
        defaultDescription
      : versionInfo.default_update_message || defaultDescription;

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
            <Text style={styles.title}>{title}</Text>

            <Text style={styles.description}>{updateMessage}</Text>
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
                  {strings.updateNow}
                </Text>
              </TouchableOpacity>

              {!versionInfo.force_update && (
                <TouchableOpacity
                  style={[styles.button, styles.laterButton]}
                  onPress={onClose}
                >
                  <Text style={styles.laterButtonText}>{strings.later}</Text>
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
