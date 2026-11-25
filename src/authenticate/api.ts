import { API_BASE_URL, CLIENT_VERSION } from "../constants";
import { sdkHeaders } from "../installId";
import { AppInfo, AuthenticateResponse } from "../models";

export const authenticate = async (
  info: AppInfo,
  apiToken: string,
  userId: string
) => {
  const url = `${API_BASE_URL}/v2/authenticate`;

  const response = await fetch(url, {
    method: "POST",
    headers: await sdkHeaders(apiToken, CLIENT_VERSION),
    body: JSON.stringify({
      user_id: userId,
      platform: info.platform,
      app_version: info.appVersion,
      environment: info.environment,
    }),
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as AuthenticateResponse;
};
