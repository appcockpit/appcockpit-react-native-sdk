import { API_BASE_URL, CLIENT_VERSION } from "../constants";
import { MaintenanceInfo, MaintenanceResponse } from "../models";

export const getMaintenanceMode = async (
  info: MaintenanceInfo,
  apiToken: string
): Promise<MaintenanceResponse | null> => {
  try {
    const url = `${API_BASE_URL}/v2/maintenance?app_id=${info.appId}&environment=${info.environment}`;

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

    const maintenanceData: MaintenanceResponse = await response.json();
    return maintenanceData;
  } catch (error) {
    console.error("Error fetching maintenance info:", error);
    return null;
  }
};
