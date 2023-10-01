import React, { useCallback, useEffect, useState } from "react";
import { ChatbotSettingD, WidgetPlace } from "../types";
import { MessageEventResponse, SocketState } from "../types/socket";
import { StorageManager } from "../utils/storage";
import { getChatbotCreds } from "../utils/helper";
import { useSettings } from "../hooks/useSettings";
import socketManager from "../utils/socket";
import { SocketListenE } from "../types/enum/socket";

declare global {
  interface Window {
    YOURGPT_PROJECT_UID: string;
    YOURGPT_WIDGET_UID: string;
  }
}

type ChatbotContextType = {
  chatbotSettings: ChatbotSettingD | null;
  isFullPage: boolean;
  chatbotPopup: boolean;
  setChatbotPopup: React.Dispatch<React.SetStateAction<boolean>>;
  widgetUid: string;
  chatbotUid: string;
  notifyTyping: (typing: boolean) => void;
  socketState: SocketState;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  unseenCount: number;
  browserTabActive: boolean;
  loadingChatbotSettings: boolean;
  widgetPlace: WidgetPlace;
  visitorUid: string;
  socketConnected: boolean;
};

const ChatbotContext = React.createContext<ChatbotContextType>({} as ChatbotContextType);

export const useChatbot = () => React.useContext(ChatbotContext);

export default function ChatbotProvider({ children, widgetPlace }: { children: React.ReactNode; widgetPlace: WidgetPlace }) {
  /**
   * CONFIG
   */

  const [chatbotUid] = useState(() => {
    const p = getChatbotCreds();
    if (p) {
      return p.chatbotUid;
    }
    return "";
  });
  const [widgetUid] = useState(() => {
    const p = getChatbotCreds();
    if (p) {
      return p.widgetUid;
    }
    return "";
  });

  const [isFullPage] = useState(() => {
    return getChatbotCreds()?.fullPage ? true : false;
  });

  /**
   * CONFIG
   */

  const [visitorUid, setVisitorUid] = useState("");

  const [socketState, setSocketState] = useState<SocketState>("idle");
  const [socketConnected, setSocketConnected] = useState(false);

  const { chatbotSettings, loadingChatbotSettings } = useSettings({ chatbotUid, widgetUid });

  const [expanded, setExpanded] = useState(false);

  const [browserTabActive, setBrowserTabActive] = useState(true);

  //TEMP STATES
  const [chatbotPopup, setChatbotPopup] = useState(widgetPlace === "showcase" ? true : false);

  const [unseenCount, setUnseenCount] = useState(0);

  /**
   * EXTRA
   */

  useEffect(() => {
    document.addEventListener("visibilitychange", () => {
      setBrowserTabActive(document.visibilityState === "visible");
    });
  }, []);

  useEffect(() => {
    if (chatbotPopup) {
      setUnseenCount(0);
    }
  }, [chatbotPopup]);

  /**
   * STORAGE MANAGER
   */
  // useEffect(() => {
  //   if (sessionData && widgetUid) {
  //     StorageManager.setStorage({
  //       sessionData,
  //       widgetUid,
  //     });
  //   }
  // }, [sessionData, widgetUid]);

  /**
   * SOCKET EMMITERS
   */

  useEffect(() => {
    const stored = StorageManager.getStorage(widgetUid);
    if (stored?.visitorUid) {
      setVisitorUid(stored.visitorUid);
    } else {
      if (widgetUid && socketConnected) {
        socketManager.createVisitor({
          widget_uid: widgetUid,
        });
      }
    }
    return () => {};
  }, [widgetUid, socketConnected]);

  useEffect(() => {
    if (visitorUid && widgetUid) {
      socketManager.joinVisitor({
        visitor_uid: visitorUid,
        widget_uid: widgetUid,
      });
    }
  }, [visitorUid, widgetUid]);

  const notifyTyping = useCallback((typing: boolean) => {
    console.log("typing", typing);
    // if (!sessionData) {
    //   return;
    // }
    // socketManager.sendCompose({
    //   chatbot_uid: chatbotUid,
    //   from: "user",
    //   session_uid: sessionData?.session_uid,
    //   widget_uid: widgetUid,
    //   type: typing ? "start" : "stop",
    //   content: {
    //     type: "typing",
    //   },
    // });
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      if (visitorUid) {
        socketManager.navigation({
          page_title: document.title,
          url: window.location.href,
          visitor_uid: visitorUid,
        });
      }
    };

    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, [visitorUid]);

  /**
   * SOCKET HANDLES
   */

  const handleVisitorCreated = useCallback(
    (data: any) => {
      setVisitorUid(data.visitor_uid);
      StorageManager.setStorage({
        visitorUid: data.visitor_uid,
        widgetUid,
      });
    },
    [widgetUid]
  );

  const handleMessageReceived = useCallback(
    (data: MessageEventResponse) => {
      console.log(data, browserTabActive, chatbotPopup);
    },
    [browserTabActive, chatbotPopup]
  );

  const handleConnected = useCallback(() => {
    setSocketState("connected");
    setSocketConnected(true);
  }, []);

  useEffect(() => {
    socketManager.socket.on(SocketListenE.messageReceived, handleMessageReceived);
    socketManager.socket.on(SocketListenE.connect, handleConnected);

    socketManager.socket.on(SocketListenE.visitorCreated, handleVisitorCreated);
    return () => {
      socketManager.socket.off(SocketListenE.messageReceived, handleMessageReceived);
      socketManager.socket.off(SocketListenE.connect, handleConnected);

      socketManager.socket.on(SocketListenE.visitorCreated, handleVisitorCreated);
    };
  }, [handleMessageReceived, handleConnected, handleVisitorCreated]);

  return (
    <ChatbotContext.Provider
      value={{
        chatbotUid,
        widgetUid,
        chatbotSettings,
        isFullPage,
        chatbotPopup,
        setChatbotPopup,
        notifyTyping,
        socketState,
        expanded,
        setExpanded,
        unseenCount,
        browserTabActive,
        loadingChatbotSettings,
        widgetPlace,
        visitorUid,
        socketConnected,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
}
