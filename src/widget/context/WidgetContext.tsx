import { createContext, useContext } from "react";
import { WidgetColorsD, WidgetLayoutD } from "../../types/layout/global";
import { ChatbotSettingApiD } from "../../types";
import { useChatbot } from "../../context/ChatbotContext";

export const WIDGET_COLORS: WidgetColorsD[] = [
  {
    primary: "#622BFF",
    textOnPrimary: "#ffffff",
  },
  {
    primary: "#0A2647", // Blue
    textOnPrimary: "#ffffff",
  },
  {
    primary: "#E74646", // Red
    textOnPrimary: "#ffffff",
  },
  {
    primary: "#1746A2", // Yellow
    textOnPrimary: "#ffffff",
  },
  {
    primary: "#4942E4", // Green
    textOnPrimary: "#ffffff",
  },
  {
    primary: "#3E54AC", // Purple
    textOnPrimary: "#ffffff",
  },
];

export const initialLayout: WidgetLayoutD = {
  type: "compact",
  version: 1,
  defaultQuestions: {},
  externalLinks: [
    {
      type: "link",
      link: "https://twitter.com/YourGPTAI",
      text: "Yo yo honey singh",
    },
    {
      type: "card",
      link: "https://twitter.com/YourGPTAI",
      text: "Yo yo honey singh",
      image: "https://epicxplorer.com/_next/image?url=https%3A%2F%2Fassets.epicxplorer.com%2Ffeatured_image%2F1694693993.PNG&w=3840&q=75",
    },
    {
      type: "socialMedia",
      socialItems: [
        {
          type: "discord",
          link: "https://twitter.com/YourGPTAI",
        },
        {
          type: "facebook",
          link: "https://twitter.com/YourGPTAI",
        },
        {
          type: "whatsapp",
          link: "https://twitter.com/YourGPTAI",
        },
      ],
      visible: false,
    },
  ],
  colors: {
    primary: WIDGET_COLORS[0].primary,
    textOnPrimary: WIDGET_COLORS[0].textOnPrimary,
  },
  welcomeMessage: {
    en: `👋 Hi There!\nHow can i assist you today`,
  },
};

type WidgetContextD = {
  layout: WidgetLayoutD | null;
  setting: ChatbotSettingApiD | null;
  loading: boolean;
};

export const WidgetContext = createContext<WidgetContextD>({} as WidgetContextD);

export function useWidget() {
  return useContext(WidgetContext);
}

export default function WidgetProvider({ children }: { children: React.ReactNode }) {
  const { chatbotSettings, loadingChatbotSettings } = useChatbot();

  console.log("-----", chatbotSettings);

  return (
    <WidgetContext.Provider
      value={{
        loading: loadingChatbotSettings,
        layout: chatbotSettings?.layout || initialLayout,
        setting: chatbotSettings,
      }}
    >
      {children}
    </WidgetContext.Provider>
  );
}