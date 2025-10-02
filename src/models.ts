export type VersionInfo = {
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
