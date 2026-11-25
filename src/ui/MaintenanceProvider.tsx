import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AppState } from "react-native";
import { getMaintenanceMode } from "../maintenance/maintenance";
import { maintenanceStateFrom, nextCheckDelayMs } from "../maintenance/schedule";
import { MaintenanceInfo, MaintenanceResponse } from "../models";
import { isMaintenanceDismissed, storeDismissedMaintenance } from "../storageHelper";
import {
  MaintenanceBanner as DefaultMaintenanceBanner,
  MaintenanceBannerProps,
  MaintenanceBannerTheme,
} from "./MaintenanceBanner";
import { MaintenanceScreen as DefaultMaintenanceScreen } from "./MaintenanceScreen";

export type MaintenanceScreenProps = PropsWithChildren<{
  maintenanceInfo: MaintenanceResponse;
}>;


type Props = PropsWithChildren<{
  info: MaintenanceInfo;
  apiToken: string;
  MaintenanceScreen?: FC<MaintenanceScreenProps>;
  /** Replace the banner shown before a scheduled maintenance window. */
  MaintenanceBanner?: FC<MaintenanceBannerProps>;
  /** Show a banner before a scheduled maintenance window. Default true. */
  showBanner?: boolean;
  /** Locale for the banner's date and time, e.g. "de-DE". Defaults to the device's. */
  locale?: string;
  theme?: {
    backgroundColor?: string;
    titleColor?: string;
    messageColor?: string;
    linkColor?: string;
    banner?: MaintenanceBannerTheme;
  };
}>;

export const MaintenanceProvider: FC<Props> = ({
  children,
  info,
  apiToken,
  MaintenanceScreen,
  MaintenanceBanner,
  showBanner = true,
  locale,
  theme,
}) => {
  const [response, setResponse] = useState<MaintenanceResponse | null>(null);
  const [dismissedStart, setDismissedStart] = useState<string | null>(null);
  // Re-render when a known start/end time passes, even before the next check.
  const [, setTick] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const check = useCallback(async () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;

    const next = await getMaintenanceMode(info, apiToken);
    setResponse(next);
    if (next?.upcoming && next.starts_at && (await isMaintenanceDismissed(info.appId, next.starts_at))) {
      setDismissedStart(next.starts_at);
    }

    const delay = nextCheckDelayMs(next);
    if (delay !== null) {
      timer.current = setTimeout(() => {
        setTick((t) => t + 1);
        check();
      }, delay);
    }
  }, [info.appId, info.environment, apiToken]);

  useEffect(() => {
    check();
    // Coming back to the app picks up maintenance scheduled in the meantime.
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") check();
    });
    return () => {
      sub.remove();
      if (timer.current) clearTimeout(timer.current);
    };
  }, [check]);

  const state = maintenanceStateFrom(response);

  if (state.kind === "active") {
    if (MaintenanceScreen) {
      return <MaintenanceScreen maintenanceInfo={state.info} children={children} />;
    }
    return <DefaultMaintenanceScreen maintenanceInfo={state.info} children={children} theme={theme} />;
  }

  if (state.kind === "upcoming" && showBanner && dismissedStart !== state.info.starts_at) {
    const bannerProps: MaintenanceBannerProps = {
      maintenanceInfo: state.info,
      startsAt: state.startsAt,
      endsAt: state.endsAt,
      onDismiss: () => {
        const startsAt = state.info.starts_at!;
        setDismissedStart(startsAt);
        storeDismissedMaintenance(info.appId, startsAt);
      },
    };
    return (
      <>
        {children}
        {MaintenanceBanner ? (
          <MaintenanceBanner {...bannerProps} />
        ) : (
          <DefaultMaintenanceBanner {...bannerProps} theme={theme?.banner} locale={locale} />
        )}
      </>
    );
  }

  return children;
};
