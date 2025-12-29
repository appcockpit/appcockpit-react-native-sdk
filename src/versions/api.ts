import { API_BASE_URL, CLIENT_VERSION } from "../constants";
import { AppInfo, VersionResponse } from "../models";

export const fetchVersion = async (info: AppInfo, apiToken: string) => {
  const url = `${API_BASE_URL}/v2/versions?app_id=${info.appId}&app_version=${info.appVersion}&platform=${info.platform}&environment=${info.environment}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-token": apiToken,
      "x-client-version": CLIENT_VERSION,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as VersionResponse;
};
