import { useEffect, useState } from "react";
import { getChatbotSettingApi } from "../network/api";
import { ChatbotSettingApiD } from "../types";
import { initialLayout } from "../widget/context/WidgetContext";

export const useSettings = ({ chatbotUid, widgetUid }: { chatbotUid: string; widgetUid: string }) => {
  const [chatbotSettings, setChatbotSettings] = useState<ChatbotSettingApiD | null>(null);
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
          layout: initialLayout,
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
