import React, { useCallback, useEffect, useState } from "react";
import { ChatbotSettingD, WidgetPlace } from "../types";
import { MessageEventResponse, MessagesComponseEventResponse, SessionData, SocketState } from "../types/socket";
import { StorageManager } from "../utils/storage";
import { getChatbotCreds, getVisitorName, playSound } from "../utils/helper";
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
  sessionData: SessionData | null;
  widgetUid: string;
  chatbotUid: string;
  notifyTyping: (typing: boolean) => void;
  clearSession: () => any;
  socketState: SocketState;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  unseenCount: number;
  browserTabActive: boolean;
  loadingChatbotSettings: boolean;
  widgetPlace: WidgetPlace;
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

  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  const [socketState, setSocketState] = useState<SocketState>("idle");
  const { chatbotSettings, loadingChatbotSettings } = useSettings({ chatbotUid, widgetUid });

  const [expanded, setExpanded] = useState(false);

  const [browserTabActive, setBrowserTabActive] = useState(true);

  //TEMP STATES
  const [chatbotPopup, setChatbotPopup] = useState(false);

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
  useEffect(() => {
    if (sessionData && widgetUid) {
      StorageManager.setStorage({
        sessionData,
        widgetUid,
      });
    }
  }, [sessionData, widgetUid]);

  /**
   * SOCKET EMMITERS
   */

  useEffect(() => {
    if (widgetUid && chatbotUid) {
      const stored = StorageManager.getStorage(widgetUid);

      if (stored?.sessionData) {
        setSessionData(stored.sessionData);
      } else {
        setSocketState("creatingSession");
        socketManager.createSession({
          chatbot_uid: chatbotUid,
          widget_uid: widgetUid,
          //TEMP
          device_type: "NA",
          platform: "NA",
        });
      }
    }
  }, [widgetUid, chatbotUid]);

  const notifyTyping = useCallback(
    (typing: boolean) => {
      if (!sessionData) {
        return;
      }
      socketManager.sendCompose({
        chatbot_uid: chatbotUid,
        from: "user",
        session_uid: sessionData?.session_uid,
        widget_uid: widgetUid,
        type: typing ? "start" : "stop",
        content: {
          type: "typing",
        },
      });
    },
    [sessionData, chatbotUid, widgetUid]
  );

  /**
   * SOCKET HANDLES
   */

  const handleJoined = useCallback(() => {
    setSocketState("joined");
  }, []);

  const handleSessionCreated = useCallback((data: SessionData) => {
    setSessionData(data);
  }, []);

  useEffect(() => {
    if (sessionData && !(socketState === "idle" || socketState === "error")) {
      socketManager.joinSession({
        chatbot_uid: chatbotUid,
        session_uid: sessionData.session_uid,
        user: {
          name: "visitor" + getVisitorName(sessionData.id),
        },
        device: {
          page_title: document.title,
          page_url: window.location.href,
        },
      });
    }
  }, [sessionData, chatbotUid, socketState]);

  const handleMessageReceived = useCallback(
    (data: MessageEventResponse) => {
      console.log(data);

      if (!sessionData) {
        return;
      }

      if (!browserTabActive) {
        playSound();
      }

      if (!chatbotPopup) {
        setUnseenCount((s) => s + 1);
      }
    },
    [sessionData, browserTabActive, chatbotPopup]
  );

  const handleMessageCompose = useCallback((data: MessagesComponseEventResponse) => {
    console.log("HANDLE COMPSE", data);
  }, []);

  const handleConnected = useCallback(() => {
    setSocketState("connected");
  }, []);

  useEffect(() => {
    socketManager.socket.on(SocketListenE.joined, handleJoined);
    socketManager.socket.on(SocketListenE.sessionCreated, handleSessionCreated);
    socketManager.socket.on(SocketListenE.messageReceived, handleMessageReceived);
    socketManager.socket.on(SocketListenE.messageCompose, handleMessageCompose);
    socketManager.socket.on(SocketListenE.connect, handleConnected);
    return () => {
      socketManager.socket.off(SocketListenE.joined, handleJoined);
      socketManager.socket.off(SocketListenE.sessionCreated, handleSessionCreated);
      socketManager.socket.off(SocketListenE.messageReceived, handleMessageReceived);
      socketManager.socket.off(SocketListenE.messageCompose, handleMessageCompose);
      socketManager.socket.off(SocketListenE.connect, handleConnected);
    };
  }, [handleJoined, handleMessageReceived, handleSessionCreated, handleMessageCompose, handleConnected]);

  const clearSession = () => {
    setSessionData(null);
    StorageManager.clearStorage(widgetUid);
    setSocketState("resettingSession");
    socketManager.createSession({
      chatbot_uid: chatbotUid,
      widget_uid: widgetUid,
      //TEMP
      device_type: "NA",
      platform: "NA",
    });
  };

  return (
    <ChatbotContext.Provider
      value={{
        chatbotUid,
        widgetUid,
        sessionData,
        chatbotSettings,
        isFullPage,
        chatbotPopup,
        setChatbotPopup,
        notifyTyping,
        clearSession,
        socketState,
        expanded,
        setExpanded,
        unseenCount,
        browserTabActive,
        loadingChatbotSettings,
        widgetPlace,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
}
