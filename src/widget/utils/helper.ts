import { DeviceTypeD, PlatformTypeD } from "../types";
import { MessageD, RenderMessageItem } from "../types/message";
import { FULL_SCREEN_ROUTE } from "./constants";

export const getVisitorName = (n: string | number) => {
  if (typeof n === "undefined") return "";
  const str = n.toString()?.slice(-4);
  return str.split("").reverse().join("");
};

export function customDebounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
  context?: any // Add an optional context parameter
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>): void {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(context, args); // Use the provided context
    }, delay);
  };
}

export const parseStreamString = (str: string) => str.replaceAll("[LINE_END]", "\n").replaceAll("||", "|\n|").replaceAll(":|", "\n|") || "";

export function playSound() {
  const audio = new Audio("/assets/messageSound1.mp3");
  audio.play();
}

export const getChatbotCreds = (): { widgetUid: string; fullPage: boolean } | null => {
  if (import.meta.env.DEV) {
    if (window.location.pathname.split("/").length === 2) {
      return {
        widgetUid: window.location.pathname.split("/")[1] || "",
        fullPage: false,
      };
    }
  } else {
    if (window.YOURGPT_WIDGET_UID) {
      return {
        widgetUid: window.YOURGPT_WIDGET_UID,
        fullPage: false,
      };
    }
    const currentPath = window?.location?.pathname;
    const domainName = window?.location?.hostname;
    if (domainName === FULL_SCREEN_ROUTE && currentPath.split("/").length === 2) {
      return {
        widgetUid: currentPath.split("/")[1] || "",
        fullPage: true,
      };
    }
    return null;
  }
  return null;
};

export const getRenderMessageItem = (message: MessageD): RenderMessageItem => {
  return {
    text: message?.message || message.content?.message || "",
    id: message.id || message.content?.message_id,
    localId: message.localId,
    sent: message.from == "user" || message.send_by == "user",
    from: message.from || message.send_by,
    rate: message.rate || null,
    user: {
      pic: message.operator?.profile_pic,
      fName: message.operator?.first_name,
      name: message.operator?.name,
    },
    loadingStatus: message.loadingStatus,
    createdAt: message.createdAt,
    links: message.links || [],
  };
};

export const DEVICE_TYPE: DeviceTypeD = "desktop";
export const PLATFORM: PlatformTypeD = "mac";

export const MOBILE_APP_VIEW = new URL(window.location.href).searchParams.has("mobileAppView");
export const HIDE_HEADER = new URL(window.location.href).searchParams.has("hideHeader");
export const HIDE_LEARN_MORE = new URL(window.location.href).searchParams.has("hideLearnMore");
export const HIDE_LANGUAGE = new URL(window.location.href).searchParams.has("hideLanguage");
export const HIDE_FEEDBACK = new URL(window.location.href).searchParams.has("hideFeedback");
export const HIDE_FOOTER = new URL(window.location.href).searchParams.has("hideFooter");
