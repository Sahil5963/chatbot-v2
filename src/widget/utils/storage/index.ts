import { MessageD } from "../../types/message";
import { SessionData } from "../../types/socket";

export const StorageManager = {
  setStorage: ({ sessionData, messages, widgetUid }: { sessionData?: SessionData; messages?: MessageD[]; widgetUid: string }) => {
    let mainOb: any = {};

    const objStr = localStorage.getItem(`yourgpt-chatbot-${widgetUid}`);

    if (objStr) {
      mainOb = {
        ...JSON.parse(objStr),
      };
    }

    if (sessionData) {
      mainOb.sessionData = sessionData;
    }
    if (messages) {
      mainOb.messages = messages;
    }
    localStorage.setItem(`yourgpt-chatbot-${widgetUid}`, JSON.stringify(mainOb));
  },

  getStorage: (widgetUid: string): { sessionData?: SessionData; messages?: MessageD[] } | null => {
    const objStr = localStorage.getItem(`yourgpt-chatbot-${widgetUid}`);

    if (objStr) {
      return JSON.parse(objStr);
    }

    return null;
  },
  clearStorage: (widgetUid: string) => {
    localStorage.removeItem(`yourgpt-chatbot-${widgetUid}`);
  },
};
