import React, { useCallback, useEffect, useState } from "react";
import { MessageD } from "../../types/message";
import { useChatbot } from "../../context/ChatbotContext";
import { StorageManager } from "../../utils/storage";
import socketManager from "../../utils/socket";
import { MessageEventResponse, MessagesComponseEventResponse } from "../../types/socket";
import { playSound } from "../../utils/helper";
import { getStreamData } from "../../utils";
import { SocketListenE } from "../../types/enum/socket";

type LoadingStatus = "loading" | "typing" | null;

type CompactContextType = {
  messages: MessageD[];
  setMessages: React.Dispatch<React.SetStateAction<MessageD[]>>;
  sendMessage: (message: string) => void;
  loadingStatus: LoadingStatus;
  rateMessage: ({ rate, messageId }: { rate: "1" | "0"; messageId: any }) => void;
  unseenCount: number;
};

const CompactContext = React.createContext<CompactContextType>({} as CompactContextType);

export const useCompactChatbot = () => React.useContext(CompactContext);

export default function CompactChatbotProvider({ children }: { children: React.ReactNode }) {
  const { chatbotPopup, sessionData, widgetUid, chatbotUid, socketState, browserTabActive } = useChatbot();

  /**
   * CONFIG
   */

  const [messages, setMessages] = useState<MessageD[]>([]);

  const [pendingMessageQueue, setPendingMessageQueue] = useState<MessageD[]>([]);

  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>(null);

  //TEMP STATES

  const [unseenCount, setUnseenCount] = useState(0);

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
        sessionData,
        widgetUid,
      });
    }
  }, [sessionData, widgetUid]);

  useEffect(() => {
    if (messages.length > 0 && widgetUid) {
      StorageManager.setStorage({
        messages,
        widgetUid,
      });
    }
  }, [messages, widgetUid]);

  useEffect(() => {
    if (widgetUid) {
      const stored = StorageManager.getStorage(widgetUid);

      if (stored?.messages) {
        setMessages(stored.messages);
      }
    }
  }, [widgetUid]);

  /**
   * SOCKET EMMITERS
   */

  /**
   * SOCKET HANDLES
   */

  useEffect(() => {
    if (socketState === "joined") {
      if (pendingMessageQueue.length > 0 && sessionData) {
        pendingMessageQueue.forEach((message) => {
          if (!message.content.message?.trim()) return;
          socketManager.sendMessage({
            chatbot_uid: chatbotUid,
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
    }
  }, [socketState, pendingMessageQueue, chatbotUid, widgetUid, sessionData]);

  const handleMessageReceived = useCallback(
    (data: MessageEventResponse) => {
      setLoadingStatus(null);

      if (!sessionData) {
        return;
      }

      if (!browserTabActive) {
        playSound();
      }

      if (!chatbotPopup) {
        setUnseenCount((s) => s + 1);
      }

      if (data.type === "stream" && data.content?.stream_url) {
        const streamIndex = messages.length;

        setMessages((s) => {
          const newMessages = [...s];
          newMessages.push({
            ...data,
            loadingStatus: "streaming",
            localId: Date.now(),
            from: "assistant",
            createdAt: null,
            content: {
              message: "",
            },
          });

          return newMessages;
        });

        getStreamData({
          url: data.content.stream_url,
          onUpdate: (res) => {
            console.log(res);

            setLoadingStatus(null);

            socketManager.sendCompose({
              chatbot_uid: chatbotUid,
              from: "assistant",
              session_uid: sessionData.session_uid,
              widget_uid: widgetUid,
              type: res.finished ? "stop" : "start",
              content: {
                message: res.res,
                type: "streaming",
              },
            });

            setMessages((s) => {
              const newMessages = [...s];
              newMessages[streamIndex] = {
                ...newMessages[streamIndex],
                loadingStatus: res.finished ? null : "streaming",
                content: {
                  ...newMessages[streamIndex].content,
                  message: res.res,
                  message_id: Number(res.messageId || 0) || newMessages[streamIndex].content.message_id || 0,
                },
                createdAt: res.finished ? Date.now() : null,
                links: res.links || newMessages[streamIndex].links || [],
              };

              console.log([...newMessages].pop(), res);

              return newMessages;
            });
          },
        });
      } else if (data.type === "text") {
        setMessages((s) => {
          return [
            ...s,
            {
              ...data,
              loadingStatus: null,
              localId: Date.now(),
              createdAt: Date.now(),
            },
          ];
        });
      }
    },
    [messages, sessionData, chatbotUid, widgetUid, browserTabActive, chatbotPopup]
  );

  const handleMessageCompose = useCallback((data: MessagesComponseEventResponse) => {
    if (data.type == "start" && data.content?.type === "loading") {
      setLoadingStatus("loading");
    }
  }, []);

  useEffect(() => {
    socketManager.socket.on(SocketListenE.messageReceived, handleMessageReceived);
    socketManager.socket.on(SocketListenE.messageCompose, handleMessageCompose);
    return () => {
      socketManager.socket.off(SocketListenE.messageReceived, handleMessageReceived);
      socketManager.socket.off(SocketListenE.messageCompose, handleMessageCompose);
    };
  }, [handleMessageReceived, handleMessageCompose]);

  const sendMessage = (message: string) => {
    if (!message?.trim()) {
      return;
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
        chatbot_uid: chatbotUid,
        widget_uid: widgetUid,
        message: message,
        flow_id: "",
        from: "user",
        origin: "chat",
        session_uid: sessionData?.session_uid,
        type: "text",
      });
    }
  };

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

  return (
    <CompactContext.Provider
      value={{
        messages,
        setMessages,
        sendMessage,
        loadingStatus,
        rateMessage,
        unseenCount,
      }}
    >
      {children}
    </CompactContext.Provider>
  );
}
