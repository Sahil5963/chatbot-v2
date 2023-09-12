export type LayoutTypeD = "compact" | "tabs";

export type BottomTabsD = "homeTab" | "messagesTab" | "profileTab";

export type ScreensD = BottomTabsD | "chatScreen" | "allTabs";

export enum Lang {
  en = "en",
}

export type LayoutD = {
  type: LayoutTypeD;
  name: string;
  version: number;
  primaryColor: string;
  textOnPrimaryColor: string;
  bottomTabs?: {
    key: BottomTabsD;
    title: string;
    visibility: "0" | "1";
  }[];

  logo: string;
  welcomeMessage: {
    [key in Lang]: string;
  };
  defaultQuestions: DefaultQuestion[];
  externalLinks: ExternalLink[];
  accouncements: Accouncement[];
  socialMedia: SocialMediaD[];
};

export type Accouncement = {
  text: string;
  image: string;
};

export type ExternalLink = {
  label: string;
  link: string;
};

export type BottomTab = {
  title: string;
  key: string;
  visibility: string;
};

export type DefaultQuestion = {
  question: string;
  label: string;
};

export type SocialMediaType = "facebook" | "twitter" | "instagram" | "youtube" | "linkedin";

export type SocialMediaD = {
  type: SocialMediaType;
  link: string;
};

export type WelcomeMessage = {
  lang: string;
  message: string;
};
