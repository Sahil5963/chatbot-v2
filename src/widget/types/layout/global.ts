import { LanguageCodesE } from "./lang";

export enum SocialPlaformsE {
  discord = "Discord",
  whatsapp = "WhatsApp",
  facebook = "Facebook",
  twitter = "Twitter",
  // instagram = "Instagram",
  // youtube = "Youtube",
  // linkedin = "LinkedIn",
  // pinterest = "Pinterest",
  reddit = "Reddit",
  // tumblr = "Tumblr",
  // medium = "Medium",
  // telegram = "Telegram",
  // twitch = "Twitch",
  // github = "Github",
  // slack = "Slack",

  // dribbble = "Dribbble",
  // quora = "Quora",
}

export type WidgetExternalLinkType = "link" | "card" | "socialMedia";

export type WidgetSocialMediaType = keyof SocialPlaformsE;

export type WidgetColorsD = {
  primary: string;
  textOnPrimary: string;
};

export type WidgetSocialItemType = {
  link: string;
  type: keyof typeof SocialPlaformsE;
};

export type WidgetExternalLinkD = {
  type: WidgetExternalLinkType;
  link?: string;
  text?: string;
  image?: string;
  socialItems?: WidgetSocialItemType[];
  visible?: boolean;
};

export type WidgetLayoutD = {
  type: "compact" | "tab";
  version: number;
  colors: WidgetColorsD;
  welcomeMessage: {
    [value in LanguageCodesE]?: string;
  };
  defaultQuestions: {
    [value in LanguageCodesE]?: {
      question: string;
      label: string;
    }[];
  };
  externalLinks: WidgetExternalLinkD[];

  extraTabs?: {
    title: string;
    key: string;
    visibility: "1" | "0";
  }[];
};
