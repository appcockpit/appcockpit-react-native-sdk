import { FC, PropsWithChildren, useEffect, useState } from "react";
import { getMaintenanceMode } from "../maintenance/maintenance";
import { MaintenanceInfo, MaintenanceResponse } from "../models";
import { MaintenanceScreen as DefaultMaintenanceScreen } from "./MaintenanceScreen";

const DEFAULT_POLLING_INTERVAL_MS = 30000;

export type MaintenanceScreenProps = PropsWithChildren<{
  maintenanceInfo: MaintenanceResponse;
}>;

type Props = PropsWithChildren<{
  info: MaintenanceInfo;
  apiToken: string;
  MaintenanceScreen?: FC<MaintenanceScreenProps>;
  theme?: {
    backgroundColor?: string;
    titleColor?: string;
    messageColor?: string;
    linkColor?: string;
  };
}>;

export const MaintenanceProvider: FC<Props> = ({
  children,
  info,
  apiToken,
  MaintenanceScreen,
  theme,
}) => {
  const [maintenanceInfo, setMaintenanceInfo] =
    useState<MaintenanceResponse | null>(null);

  const fetchMaintenanceInfo = async () => {
    try {
      const response = await getMaintenanceMode(info, apiToken);

      if (!response || !response.active) {
        setMaintenanceInfo(null);
        return;
      }

      setMaintenanceInfo(response);
    } catch (error) {
      console.error("Error fetching maintenance info:", error);
    }
  };

  useEffect(() => {
    const checkMaintenanceMode = async () => {
      const response = await getMaintenanceMode(info, apiToken);

      if (!response || !response.active) {
        setMaintenanceInfo(null);
        return;
      }

      setMaintenanceInfo(response);

      // Only set up polling if maintenance is active
      const interval = setInterval(
        fetchMaintenanceInfo,
        DEFAULT_POLLING_INTERVAL_MS
      );

      return interval;
    };

    let interval: NodeJS.Timeout | undefined;

    checkMaintenanceMode().then((intervalId) => {
      interval = intervalId;
    });

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [info, apiToken]);

  if (!maintenanceInfo || !maintenanceInfo.active) {
    return children;
  }

  if (MaintenanceScreen) {
    return (
      <MaintenanceScreen
        maintenanceInfo={maintenanceInfo}
        children={children}
      />
    );
  }

  return (
    <DefaultMaintenanceScreen
      maintenanceInfo={maintenanceInfo}
      children={children}
      theme={theme}
    />
  );
};
