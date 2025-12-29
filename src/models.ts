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
  default_update_message: string | null;
  update_messages?: Record<string, string>;
};

export type MaintenanceInfo = {
  appId: string;
  environment: string;
};

export type MaintenanceResponse = {
  active: boolean;
  title: string | null;
  description: string | null;
  links?: Array<{
    title: string;
    url: string;
  }>;
};
