import { ChatbotSettingD } from "../../types";
import { WidgetColorsD, WidgetLayoutD } from "../../types/layout/global";

export const FULL_SCREEN_ROUTE = "chatbot-v2-henna.vercel.app";

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

export const YOUR_GPT_LAYOUT: WidgetLayoutD = {
  type: "compact",
  version: 1,
  defaultQuestions: {},
  externalLinks: [
    {
      type: "socialMedia",
      socialItems: [],
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
  position: {
    x: 20,
    y: 20,
    align: "right",
  },
};
export const YOUR_GPT_SETTING: Partial<ChatbotSettingD> = {
  name: "Your GPT Chatbot",
};
