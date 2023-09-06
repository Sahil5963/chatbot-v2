import { getChatbotSettingApi } from "network/api";
import { useEffect, useState } from "react";
import { ChatbotSettingApiD } from "types";

export const useSettings = ({ chatbotUid, widgetUid }: { chatbotUid: string; widgetUid: string }) => {
  const [chatbotSettings, setChatbotSettings] = useState<ChatbotSettingApiD | null>(null);

  useEffect(() => {
    const getSettings = async () => {
      const res = await getChatbotSettingApi({
        project_uid: chatbotUid,
        widget_uid: widgetUid,
      });
      setChatbotSettings(res?.data);
    };

    if (widgetUid && chatbotUid) getSettings();
  }, [widgetUid, chatbotUid]);

  return { chatbotSettings };
};
