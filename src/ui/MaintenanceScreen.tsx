import { FC, PropsWithChildren } from "react";
import {
  Linking,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaintenanceResponse } from "../models";

type Props = PropsWithChildren<{
  maintenanceInfo: MaintenanceResponse;
  theme?: {
    backgroundColor?: string;
    titleColor?: string;
    messageColor?: string;
    linkColor?: string;
  };
}>;

export const MaintenanceScreen: FC<Props> = ({
  maintenanceInfo,
  children,
  theme,
}) => {
  const defaultTitle = "Under Maintenance";
  const defaultMessage =
    "We're currently performing scheduled maintenance. Please check back soon.";

  const handleLinkPress = async (url: string) => {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error("Error opening link:", error);
    }
  };

  return (
    <>
      {children}
      <Modal visible={true} animationType="fade">
        <SafeAreaView
          style={[
            styles.fullScreen,
            theme?.backgroundColor && {
              backgroundColor: theme.backgroundColor,
            },
          ]}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.content}>
              <View style={styles.iconContainer}>
                <Text style={styles.iconText}>🔧</Text>
              </View>

              <Text
                style={[
                  styles.title,
                  theme?.titleColor && { color: theme.titleColor },
                ]}
              >
                {maintenanceInfo.title || defaultTitle}
              </Text>

              <Text
                style={[
                  styles.message,
                  theme?.messageColor && { color: theme.messageColor },
                ]}
              >
                {maintenanceInfo.description || defaultMessage}
              </Text>

              {maintenanceInfo.links && maintenanceInfo.links.length > 0 && (
                <View style={styles.linksContainer}>
                  {maintenanceInfo.links.map((link, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.linkButton}
                      onPress={() => handleLinkPress(link.url)}
                    >
                      <Text
                        style={[
                          styles.linkText,
                          theme?.linkColor && { color: theme.linkColor },
                        ]}
                      >
                        {link.title}
                      </Text>
                      <Text
                        style={[
                          styles.linkArrow,
                          theme?.linkColor && { color: theme.linkColor },
                        ]}
                      >
                        →
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginBottom: 32,
  },
  iconText: {
    fontSize: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  message: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    lineHeight: 26,
    paddingHorizontal: 8,
    marginBottom: 32,
  },
  linksContainer: {
    width: "100%",
    gap: 12,
  },
  linkButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
  },
  linkText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
  },
  linkArrow: {
    fontSize: 20,
    color: "#007AFF",
    fontWeight: "600",
  },
});
