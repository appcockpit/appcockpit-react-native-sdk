export type AppInfo = {
  platform: "ios" | "android";
  appId: string;
  appstoreId: string;
  appVersion: string;
  environment: string;
  userId?: string | null;
};

export type VersionResponse = {
  version: string;
  platform: "ios" | "android";
  force_update: boolean;
  default_update_message: string | null;
  update_messages?: Record<string, string>;
};

export type MaintenanceInfo = {
  appId: string;
  environment: string;
};

export type MaintenanceResponse = {
  /** Maintenance is on now: the app shows the maintenance screen. */
  active: boolean;
  /** A scheduled window starts soon: the app shows a banner. */
  upcoming?: boolean;
  /** Start of the scheduled window (ISO 8601), if scheduled. */
  starts_at?: string | null;
  /** End of the window (ISO 8601), if set. */
  ends_at?: string | null;
  title: string | null;
  description: string | null;
  links?: Array<{
    title: string;
    url: string;
  }>;
};

export type AuthenticateRequest = {
  user_id: string;
  platform: "ios" | "android";
  app_version: string;
  environment?: string;
};

export type AuthenticateResponse = {
  success: boolean;
  user_id: string;
  platform: string;
  app_version: string;
};
