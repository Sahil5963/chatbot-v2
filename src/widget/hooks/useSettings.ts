import { useEffect, useState } from "react";
import { getChatbotSettingApi } from "../network/api";
import { ChatbotSettingD } from "../types";
import { YOUR_GPT_LAYOUT } from "../utils/constants";

export const useSettings = ({ chatbotUid, widgetUid }: { chatbotUid: string; widgetUid: string }) => {
  const [chatbotSettings, setChatbotSettings] = useState<ChatbotSettingD | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSettings = async () => {
      try {
        setLoading(true);
        const res = await getChatbotSettingApi({
          project_uid: chatbotUid,
          widget_uid: widgetUid,
        });
        setLoading(false);
        setChatbotSettings({
          ...res.data,
          layout: res.data?.layout || YOUR_GPT_LAYOUT,
        });
      } catch (err) {
        setLoading(false);
        console.log("Err", err);
      }
    };

    if (widgetUid && chatbotUid) getSettings();
  }, [widgetUid, chatbotUid]);

  return { chatbotSettings, loadingChatbotSettings: loading };
};
