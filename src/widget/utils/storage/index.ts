import { MessageD } from "../../types/message";
import { SessionData } from "../../types/socket";

type DataStoreT = {
  visitorUid?: string;
  compactLayout: {
    sessionData: SessionData | null;
    messages: MessageD[];
  };
  tabLayout: {
    sessions: SessionData[];
  };
};

type StorageManagerT = {
  setStorage: (data: { compactSession?: SessionData; compactMessages?: MessageD[]; tabSessions?: SessionData[]; widgetUid: string; visitorUid?: string }) => void;
  getStorage: (widgetUid: string) => DataStoreT | null;
  clearCompactSession: (widgetUid: string) => void;
  clearTabSession: (widgetUid: string) => void;
  clearStorage: (widgetUid: string) => void;
};

export const StorageManager: StorageManagerT = {
  setStorage: ({ compactSession, compactMessages, tabSessions, widgetUid, visitorUid }) => {
    let mainOb: DataStoreT = {
      compactLayout: {
        sessionData: null,
        messages: [],
      },
      tabLayout: {
        sessions: [],
      },
    };

    const objStr = localStorage.getItem(`yourgpt-chatbot-${widgetUid}`);

    if (objStr) {
      mainOb = {
        ...JSON.parse(objStr),
      };
    }

    if (compactSession) {
      mainOb.compactLayout.sessionData = compactSession;
    }
    if (compactMessages) {
      mainOb.compactLayout.messages = compactMessages;
    }
    if (visitorUid) {
      mainOb.visitorUid = visitorUid;
    }
    if (tabSessions) {
      mainOb.tabLayout.sessions = tabSessions;
    }

    localStorage.setItem(`yourgpt-chatbot-${widgetUid}`, JSON.stringify(mainOb));
  },

  getStorage: (widgetUid: string) => {
    const objStr = localStorage.getItem(`yourgpt-chatbot-${widgetUid}`);
    if (objStr) {
      return JSON.parse(objStr);
    }
    return null;
  },
  clearCompactSession: (widgetUid: string) => {
    const objStr = localStorage.getItem(`yourgpt-chatbot-${widgetUid}`);
    if (objStr) {
      let obj = JSON.parse(objStr);
      if (obj.compactLayout) {
        obj.compactLayout = {
          sessionData: null,
          messages: [],
        };
      } else {
        obj = {
          ...obj,
          compactLayout: {
            sessionData: null,
            messages: [],
          },
        };
      }
      localStorage.setItem(`yourgpt-chatbot-${widgetUid}`, JSON.stringify(obj));
    }
  },
  clearTabSession: (widgetUid: string) => {
    const objStr = localStorage.getItem(`yourgpt-chatbot-${widgetUid}`);
    if (objStr) {
      let obj = JSON.parse(objStr);
      if (obj.tabLayout) {
        obj.tabsLayout = {
          sessions: [],
        };
      } else {
        obj = {
          ...obj,
          tabsLayout: {
            sessions: [],
          },
        };
      }
      localStorage.setItem(`yourgpt-chatbot-${widgetUid}`, JSON.stringify(obj));
    }
  },
  clearStorage: (widgetUid: string) => {
    localStorage.removeItem(`yourgpt-chatbot-${widgetUid}`);
  },
};
