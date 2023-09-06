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
