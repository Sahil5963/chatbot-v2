import { post } from "./index";

export const getChatbotSettingApi = (data: { project_uid: string; widget_uid: string }) => {
  const raw = new URLSearchParams();
  raw.append("project_uid", data.project_uid);
  raw.append("widget_uid", data.widget_uid);
  return post({
    route: `/api/v1/public/getChatbotSetting`,
    data: raw,
    config: {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  });
};
export const getSessionsApi = (data: { visitor_uid: string; page?: number; limit?: number; orderBy: "asc" | "desc" }) => {
  return post({
    route: `/chatbot/v1/getSessionByVisitorId`,
    data: JSON.stringify(data),
    config: {
      headers: {
        "Content-type": "application/json",
      },
    },
  });
};

export const getSessionMessagesApi = (data: { session_uid: string; limit?: number; page?: number }) => {
  return post({
    route: `/chatbot/v1/getSessionMessage`,
    data: JSON.stringify(data),
    config: {
      headers: {
        "Content-type": "application/json",
      },
    },
  });
};
