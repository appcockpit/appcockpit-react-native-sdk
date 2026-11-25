import { API_BASE_URL, CLIENT_VERSION } from "../constants";
import { sdkHeaders } from "../installId";
import { AppInfo, VersionResponse } from "../models";

export const fetchVersion = async (info: AppInfo, apiToken: string) => {
  const url = `${API_BASE_URL}/v2/versions?app_id=${info.appId}&app_version=${info.appVersion}&platform=${info.platform}&environment=${info.environment}`;

  const response = await fetch(url, {
    method: "GET",
    headers: await sdkHeaders(apiToken, CLIENT_VERSION),
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as VersionResponse;
};
