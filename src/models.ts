export type AppInfo = {
  platform: "ios" | "android";
  appId: string;
  appstoreId: string;
  appVersion: string;
  environment: string;
};

export type VersionResponse = {
  version: string;
  platform: "ios" | "android";
  force_update: boolean;
  update_message: string | null;
};

export type MaintenanceInfo = {
  appId: string;
  environment: string;
};

export type MaintenanceResponse = {
  active: boolean;
  title: string | null;
  message: string | null;
};
