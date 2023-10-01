import React, { useCallback, useEffect, useState } from "react";
import { MessageD, MessagesLoadingStatus } from "../../types/message";
import { useChatbot } from "../../context/ChatbotContext";
import { StorageManager } from "../../utils/storage";
import socketManager from "../../utils/socket";
import { MessagesComponseEventResponse, SessionData } from "../../types/socket";
import { SocketListenE } from "../../types/enum/socket";
import useHandleMessageReceived from "../../hooks/useReceivedMessageHandle";
import { useWidget } from "../../context/WidgetContext";

type CompactContextType = {
  messages: MessageD[];
  setMessages: React.Dispatch<React.SetStateAction<MessageD[]>>;
  sendMessage: (message: string) => void;
  loadingStatus: MessagesLoadingStatus;
  rateMessage: ({ rate, messageId }: { rate: "1" | "0"; messageId: any }) => void;
  unseenCount: number;
  clearSession: () => any;
  leadTempMessage: string;
  setLeadTempMessage: React.Dispatch<React.SetStateAction<string>>;
  leadPending: boolean;
  setLeadPending: React.Dispatch<React.SetStateAction<boolean>>;
};

const CompactContext = React.createContext<CompactContextType>({} as CompactContextType);

export const useCompactChatbot = () => React.useContext(CompactContext);

export default function CompactChatbotProvider({ children }: { children: React.ReactNode }) {
  const { chatbotPopup, widgetUid, socketState, visitorUid } = useChatbot();
  const { setting } = useWidget();

  /**
   * CONFIG
   */

  const [messages, setMessages] = useState<MessageD[]>([]);

  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  const [pendingMessageQueue, setPendingMessageQueue] = useState<MessageD[]>([]);

  const [loadingStatus, setLoadingStatus] = useState<MessagesLoadingStatus>(null);

  //TEMP STATES

  const [unseenCount, setUnseenCount] = useState(0);

  const handleMessageReceived = useHandleMessageReceived({
    chatbotPopup,
    widgetUid,
    messages,
    sessionData,
    setLoadingStatus,
    setMessages,
    setUnseenCount,
  });

  /**
   * LEAD
   */
  const [leadTempMessage, setLeadTempMessage] = useState("");
  const [leadPending, setLeadPending] = useState(false);

  useEffect(() => {
    const stored = StorageManager.getStorage(widgetUid);

    if (!stored?.leadSubmitted) {
      console.log("stored", stored, setting);
      if (setting?.enable_widget_form) {
        setLeadPending(true);
      }
    }
  }, [setting, widgetUid]);

  /**
   * EXTRA
   */

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
        widgetUid,
        compactSession: sessionData,
      });
    }
  }, [sessionData, widgetUid]);

  useEffect(() => {
    if (messages.length > 0 && widgetUid) {
      StorageManager.setStorage({
        compactMessages: messages,
        widgetUid,
      });
    }
  }, [messages, widgetUid]);

  useEffect(() => {
    if (widgetUid) {
      const stored = StorageManager.getStorage(widgetUid);
      if (stored?.compactLayout?.messages && Array.isArray(stored.compactLayout.messages)) {
        setMessages(stored.compactLayout.messages);
      }
    }
  }, [widgetUid]);

  /**
   * SOCKET HANDLES
   */

  useEffect(() => {
    if (pendingMessageQueue.length > 0 && sessionData) {
      pendingMessageQueue.forEach((message) => {
        if (!message.content.message?.trim()) return;
        socketManager.sendMessage({
          widget_uid: widgetUid,
          message: message.content.message,
          flow_id: "",
          from: "user",
          origin: "chat",
          session_uid: sessionData.session_uid,
          type: "text",
        });
        setPendingMessageQueue((s) => s.filter((i) => i.content.message_id !== message.content.message_id));
      });
    }
  }, [socketState, pendingMessageQueue, widgetUid, sessionData]);

  const handleMessageCompose = useCallback((data: MessagesComponseEventResponse) => {
    if (data.type == "start" && data.content?.type === "loading") {
      setLoadingStatus("loading");
    }
  }, []);

  const createSession = useCallback(() => {
    if (visitorUid && widgetUid) {
      socketManager.createSession({
        widget_uid: widgetUid,
        visitor_uid: visitorUid,
      });
    }
  }, [visitorUid, widgetUid]);

  const sendMessage = useCallback(
    (message: string) => {
      if (!message?.trim()) {
        return;
      }

      if (!sessionData) {
        createSession();
        setPendingMessageQueue((s) => [
          ...s,
          {
            content: {
              message: message,
            },
            localId: Date.now(),
            createdAt: Date.now(),
            from: "user",
          },
        ]);
      }

      setMessages((s) => [
        ...s,
        {
          localId: Date.now(),
          loadingStatus: null,
          content: {
            message: message,
          },
          from: "user",
          createdAt: Date.now(),
        },
      ]);

      if (sessionData && message?.trim()) {
        socketManager.sendMessage({
          widget_uid: widgetUid,
          message: message,
          flow_id: "",
          from: "user",
          origin: "chat",
          session_uid: sessionData?.session_uid,
          type: "text",
        });
      }
    },
    [sessionData, widgetUid, createSession]
  );

  const rateMessage = ({ rate, messageId }: { rate: "1" | "0"; messageId: any }) => {
    setMessages((s) => {
      return s.map((i) => {
        if (i.content.message_id && +i.content.message_id === +messageId) {
          return {
            ...i,
            rated: rate,
          };
        } else {
          return i;
        }
      });
    });
  };

  const handleSessionCreated = useCallback((data: SessionData) => {
    setSessionData(data);
  }, []);

  useEffect(() => {
    socketManager.socket.on(SocketListenE.sessionCreated, handleSessionCreated);
    socketManager.socket.on(SocketListenE.messageReceived, handleMessageReceived);
    socketManager.socket.on(SocketListenE.messageCompose, handleMessageCompose);

    return () => {
      socketManager.socket.off(SocketListenE.sessionCreated, handleSessionCreated);
      socketManager.socket.off(SocketListenE.messageReceived, handleMessageReceived);
      socketManager.socket.off(SocketListenE.messageCompose, handleMessageCompose);
    };
  }, [handleSessionCreated, handleMessageReceived, handleMessageCompose]);

  const clearSession = () => {
    setSessionData(null);
    setMessages([]);
    StorageManager.clearCompactSession(widgetUid);
    socketManager.createSession({
      visitor_uid: visitorUid,
      widget_uid: widgetUid,
    });
  };

  return (
    <CompactContext.Provider
      value={{
        messages,
        setMessages,
        sendMessage,
        loadingStatus,
        rateMessage,
        unseenCount,
        clearSession,
        leadTempMessage,
        setLeadTempMessage,
        leadPending,
        setLeadPending,
      }}
    >
      {children}
    </CompactContext.Provider>
  );
}
