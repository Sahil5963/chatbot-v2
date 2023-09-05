import React, { useCallback, useEffect, useState } from "react";
import { SocketListenE } from "types/enum/socket";
import { MessageD } from "types/message";
import { MessagesComponseEventResponse, MessagesReceivedEventResponse, SessionData, SocketState } from "types/socket";
import socketManager from "utils/socket";
import { getStreamData } from "./utils";
import { getVisitorName } from "utils/helper";

type LoadingStatus = "loading" | "typing" | null;

type ChatbotContextType = {
  messages: MessageD[];
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
  chatbotSettings: any;
  setChatbotSettings: React.Dispatch<React.SetStateAction<any>>;
  isFullPage: boolean;
  sendMessage: (message: MessageD) => void;
  chatbotPopup: boolean;
  setChatbotPopup: React.Dispatch<React.SetStateAction<boolean>>;
  sessionData: SessionData | null;
  widgetUid: string;
  chatbotUid: string;
  notifyTyping: (typing: boolean) => void;
  loadingStatus: LoadingStatus;
};

const ChatbotContext = React.createContext<ChatbotContextType>({} as ChatbotContextType);

export const useChatbot = () => React.useContext(ChatbotContext);

export default function ChatbotProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<MessageD[]>([]);
  const [chatbotSettings, setChatbotSettings] = useState<any>({});

  const [chatbotUid, setChatbotUid] = useState("");
  const [widgetUid, setWidgetUid] = useState("");
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  const [pendingMessageQueue, setPendingMessageQueue] = useState<MessageD[]>([]);

  const [socketState, setSocketState] = useState<SocketState>("idle");

  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>(null);

  //TEMP STATES
  const [chatbotPopup, setChatbotPopup] = useState(false);

  //   FULL PAGE CHECKING

  const getDetailsFromRoute = (): { widgetUid: string; chatbotUid: string } | null => {
    if (window.location.pathname.split("/").length === 3) {
      return {
        widgetUid: window.location.pathname.split("/")[2] || "",
        chatbotUid: window.location.pathname.split("/")[1] || "",
      };
    } else {
      return null;
    }
  };
  const [isFullPage] = useState(() => {
    return getDetailsFromRoute() ? true : false;
  });

  useEffect(() => {
    const p = getDetailsFromRoute();
    if (p) {
      setChatbotUid(p.chatbotUid);
      setWidgetUid(p.widgetUid);
    }
  }, [isFullPage]);

  /**
   * SOCKET EMMITERS
   */

  useEffect(() => {
    if (widgetUid && chatbotUid) {
      setSocketState("creatingSession");
      socketManager.createSession({
        chatbot_uid: chatbotUid,
        widget_uid: widgetUid,
        //TEMP
        device_type: "NA",
        platform: "NA",
      });
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
    if (pendingMessageQueue.length > 0 && sessionData) {
      pendingMessageQueue.forEach((message) => {
        if (!message.text?.trim()) return;
        socketManager.sendMessage({
          chatbot_uid: chatbotUid,
          widget_uid: widgetUid,
          message: message.text,
          flow_id: "",
          from: "user",
          origin: "chat",
          session_uid: sessionData.session_uid,
          type: "text",
        });
        setPendingMessageQueue((s) => s.filter((i) => i.id !== message.id));
      });
    }
  }, [chatbotUid, pendingMessageQueue, widgetUid, sessionData]);

  const handleSessionCreated = useCallback(
    (data: SessionData) => {
      setSessionData(data);
      socketManager.joinSession({
        chatbot_uid: chatbotUid,
        session_uid: data?.session_uid,
        user: {
          name: "visitor" + getVisitorName(data.id),
        },
        device: {
          //TEMP
          page_title: document.title,
          page_url: window.location.href,
        },
      });
    },
    [chatbotUid]
  );

  const handleMessageReceived = useCallback(
    (data: MessagesReceivedEventResponse) => {
      setLoadingStatus(null);

      if (!sessionData) {
        return;
      }

      // if (!messages[0].text) {
      //   return;
      // }

      if (data.type === "stream" && data.content?.stream_url) {
        const streamIndex = messages.length;
        getStreamData({
          url: data.content.stream_url,
          onUpdate: (data) => {
            setLoadingStatus(null);

            socketManager.sendCompose({
              chatbot_uid: chatbotUid,
              from: "assistant",
              session_uid: sessionData.session_uid,
              widget_uid: widgetUid,
              type: data.finished ? "stop" : "start",
              content: {
                message: data.res,
                type: "streaming",
              },
            });

            setMessages((s) => {
              const newMessages = [...s];
              newMessages[streamIndex] = {
                ...newMessages[streamIndex],
                loadingStatus: data.finished ? "finished" : "streaming",
                text: data.res,
                type: "text",
                sent: false,
              };

              return newMessages;
            });
          },
        });
      } else if (data.type === "text") {
        setMessages((s) => {
          // if (s[s.length - 1].loadingStatus === "finished" || s[s.length - 1].loadingStatus === "streaming") {
          return [
            ...s,
            {
              loadingStatus: "finished",
              text: data.content?.message || "Sorry, I didn't get that. Can you please rephrase?",
              type: "text",
              sent: false,
            },
          ];
          // } else {
          //   const lIndex = s.length - 1;
          //   const newMessages = [...s];
          //   newMessages[lIndex] = {
          //     ...newMessages[lIndex],
          //     loadingStatus: "finished",
          //     text: data.content?.message || "Sorry, I didn't get that. Can you please rephrase?",
          //     type: "text",
          //     sent: false,
          //   };

          //   return newMessages;
          // }
        });
      }
    },
    [messages, sessionData, chatbotUid, widgetUid]
  );

  const handleMessageCompose = useCallback((data: MessagesComponseEventResponse) => {
    if (data.type == "start" && data.content?.type === "loading") {
      setLoadingStatus("loading");
    }
  }, []);

  useEffect(() => {
    console.log("SOCKET STATE", socketState);
  }, [socketState]);

  useEffect(() => {
    socketManager.socket.on(SocketListenE.joined, handleJoined);
    socketManager.socket.on(SocketListenE.sessionCreated, handleSessionCreated);
    socketManager.socket.on(SocketListenE.messageReceived, handleMessageReceived);
    socketManager.socket.on(SocketListenE.messageCompose, handleMessageCompose);
    return () => {
      socketManager.socket.off(SocketListenE.joined, handleJoined);
      socketManager.socket.off(SocketListenE.sessionCreated, handleSessionCreated);
      socketManager.socket.off(SocketListenE.messageReceived, handleMessageReceived);
      socketManager.socket.off(SocketListenE.messageCompose, handleMessageCompose);
    };
  }, [handleJoined, handleMessageReceived, handleSessionCreated, handleMessageCompose]);

  const sendMessage = (message: MessageD) => {
    if (!message.text?.trim()) {
      return;
    }

    setMessages((s) => [
      ...s,
      {
        loadingStatus: "finished",
        id: Date.now(),
        sent: true,
        text: message.text,
      },
    ]);

    if (sessionData && message.text?.trim()) {
      socketManager.sendMessage({
        chatbot_uid: chatbotUid,
        widget_uid: widgetUid,
        message: message.text,
        flow_id: "",
        from: "user",
        origin: "chat",
        session_uid: sessionData?.session_uid,
        type: "text",
      });
    }
  };

  return (
    <ChatbotContext.Provider
      value={{
        chatbotUid,
        widgetUid,
        sessionData,
        messages,
        setMessages,
        chatbotSettings,
        setChatbotSettings,
        isFullPage,
        sendMessage,
        chatbotPopup,
        setChatbotPopup,
        notifyTyping,
        loadingStatus,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
}
