import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { AppInfo, VersionResponse } from "../models";
import { isVersionDismissed, storeDismissedVersion } from "../storageHelper";
import { fetchVersion } from "../versions/api";
import { openAppStore } from "./appstoreHelper";
import { AppUpdateScreen, UpdateButtonTheme } from "./AppUpdateScreen";

export type UpdateScreenProps = PropsWithChildren<{
  versionInfo: VersionResponse;
  appInfo: AppInfo;
  onClose: () => void;
  onUpdate: () => void;
}>;

type Props = PropsWithChildren<{
  info: AppInfo;
  apiToken: string;
  UpdateScreen?: FC<UpdateScreenProps>;
  theme?: {
    updateButton?: UpdateButtonTheme;
  };
}>;

export const AppUpdateProvider: FC<Props> = ({
  children,
  info,
  apiToken,
  UpdateScreen,
  theme,
}) => {
  const [versionInfo, setVersionInfo] = useState<VersionResponse | null>(null);
  const [showUpdateScreen, setShowUpdateScreen] = useState(false);

  const fetchVersionInfo = async () => {
    try {
      const response = await fetchVersion(info, apiToken);

      if (!response) {
        return;
      }

      setVersionInfo(response);

      // Check if this version was previously dismissed (only for non-force updates)
      if (!response.force_update) {
        const wasDismissed = await isVersionDismissed(
          info.appId,
          response.version
        );

        if (wasDismissed) {
          return;
        }
      }

      setShowUpdateScreen(true);
    } catch (error) {
      console.error("Error fetching version info:", error);
    }
  };

  useEffect(() => {
    fetchVersionInfo();
  }, [info, apiToken]);

  const handleUpdate = useCallback(async () => {
    if (versionInfo && !versionInfo.force_update) {
      storeDismissedVersion(info.appId, versionInfo.version);
    }

    try {
      await openAppStore(info.platform, info.appstoreId);
    } catch (error) {
      console.error("Error opening app store:", error);
    }

    setShowUpdateScreen(false);
  }, [info, versionInfo]);

  const handleClose = useCallback(async () => {
    if (versionInfo && !versionInfo.force_update) {
      setShowUpdateScreen(false);

      storeDismissedVersion(info.appId, versionInfo.version);
    }
  }, [info, versionInfo]);

  if (!versionInfo) {
    return children;
  }

  if (UpdateScreen) {
    if (!showUpdateScreen) {
      return children;
    }

    return (
      <UpdateScreen
        versionInfo={versionInfo}
        appInfo={info}
        children={children}
        onUpdate={handleUpdate}
        onClose={handleClose}
      />
    );
  }

  return (
    <AppUpdateScreen
      visible={showUpdateScreen}
      versionInfo={versionInfo}
      children={children}
      theme={theme}
      onUpdate={handleUpdate}
      onClose={handleClose}
    />
  );
};
