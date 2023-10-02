import { FiArrowLeft } from "react-icons/fi";

import styled from "styled-components";
import { TAB_THEME } from "../../../ui";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTabUiChatbot } from "../../../context/TabUiContext";
import AnimatedHeader from "../../../(components)/AnimatedHeader";
import { IconBtn, ScrollDiv } from "../../../../(components)/styles";
import ChatItem from "../../../../(components)/ChatItem";
import ChatActionBar from "../../../../(components)/ChatActionBar";
import { useWidget } from "../../../../context/WidgetContext";
import { MessageD, MessagesLoadingStatus } from "../../../../types/message";
import { YOUR_GPT_LAYOUT } from "../../../../utils/constants";
import { SocketListenE } from "../../../../types/enum/socket";
import socketManager from "../../../../utils/socket";
import { MessagesComponseEventResponse, SessionData } from "../../../../types/socket";
import useHandleMessageReceived from "../../../../hooks/useReceivedMessageHandle";
import { useChatbot } from "../../../../context/ChatbotContext";
import { getSessionMessagesApi } from "../../../../network/api";
import { ApiRes } from "../../../../types/enum";
import { useTabChatbot } from "../../../context/TabContext";
import { StorageManager } from "../../../../utils/storage";
import Chatform from "../../../../(components)/ChatForm";
import Spinner from "../../../../(components)/Spinner";

const LIMIT = 100;

export default function Chat() {
  const { navigate, activeRoute, clearPrams } = useTabUiChatbot();
  const { leadTempMessage, leadPending, setLeadPending, setLeadTempMessage } = useTabChatbot();
  const { widgetUid, visitorUid, chatbotPopup } = useChatbot();
  const [messages, setMessages] = useState<MessageD[]>([]);
  const { layout } = useWidget();
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setLoadingStatus] = useState<MessagesLoadingStatus>(null);

  const [loadingMessages, setLoadingMessages] = useState(false);
  const pendingQuery = useRef("");

  const [newChat, setNewChat] = useState(false);

  const handleMessageReceived = useHandleMessageReceived({
    messages,
    sessionData,
    setLoadingStatus: () => {},
    setMessages,
    setUnseenCount: () => {},
    widgetUid,
    chatbotPopup,
  });

  const createSession = useCallback(() => {
    if (visitorUid && widgetUid) {
      socketManager.createSession({
        widget_uid: widgetUid,
        visitor_uid: visitorUid,
      });
    }
  }, [visitorUid, widgetUid]);

  const sendMessage = useCallback(
    (message: string, ignoreLead = false) => {
      if (!message?.trim()) {
        return;
      }

      if (!ignoreLead) {
        if (leadTempMessage) {
          return;
        }

        if (leadPending) {
          setLeadTempMessage(message);
          createSession();
          return;
        }
      }

      if (!sessionData) {
        if (!pendingQuery.current) {
          pendingQuery.current = message;
          createSession();
        }
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
    [sessionData, widgetUid, createSession, leadTempMessage, leadPending, setLeadTempMessage]
  );

  useEffect(() => {
    if (pendingQuery.current) {
      sendMessage(pendingQuery.current);
      pendingQuery.current = "";
    }
  }, [sendMessage]);

  useEffect(() => {
    if (activeRoute.params?.sessionData) {
      setSessionData(activeRoute.params.sessionData);
      setNewChat(false);
    } else {
      setNewChat(true);
      if (activeRoute.params?.query) {
        pendingQuery.current = activeRoute.params?.query;
        createSession();
      }
    }
  }, [activeRoute, createSession]);

  const fetchMessages = useCallback(async () => {
    if (!sessionData?.session_uid) return;

    try {
      setLoadingMessages(true);
      const res = await getSessionMessagesApi({
        session_uid: sessionData.session_uid,
        limit: LIMIT,
        page: 1,
      });

      setLoadingMessages(false);
      if (res.type === ApiRes.SUCCESS) {
        setMessages(res.data);
      }
    } catch (err) {
      setLoadingMessages(false);
      console.log("Err", err);
    }
  }, [sessionData]);

  useEffect(() => {
    if (!newChat) {
      fetchMessages();
    }
  }, [fetchMessages, newChat]);

  //MANAGE REAL TIME SESSION SYSNC

  // useEffect(() => {
  //   return () => {
  //     if (sessionData) {
  //       const lastMessage = messages[messages.length - 1];

  //       let renderMessage: RenderMessageItem | null = null;

  //       if (lastMessage) {
  //         renderMessage = getRenderMessageItem(lastMessage);
  //       }

  //       setSessions((s) => {
  //         const newS = [...s];

  //         const presentIndex = newS.findIndex((i) => i.session_uid === sessionData?.session_uid);

  //         if (presentIndex !== -1) {
  //           newS[presentIndex] = {
  //             ...newS[presentIndex],
  //             updatedAt: lastMessage?.createdAt || new Date().toISOString(),
  //             last_message: renderMessage?.text || "",
  //             createdAt: lastMessage?.createdAt || new Date().toISOString(),
  //           };
  //         } else {
  //           newS.push({
  //             updatedAt: lastMessage?.createdAt || new Date().toISOString(),
  //             last_message: renderMessage?.text || "",
  //             session_uid: sessionData?.session_uid,
  //             createdAt: lastMessage?.createdAt || new Date().toISOString(),
  //             id: sessionData?.session_uid,
  //           });
  //         }

  //         return newS;
  //       });
  //     }
  //   };
  // }, [messages, sessionData, setSessions]);

  const handleSessionCreated = useCallback((data: SessionData) => {
    setSessionData(data);
  }, []);

  const handleMessageCompose = useCallback((data: MessagesComponseEventResponse) => {
    if (data.type == "start" && data.content?.type === "loading") {
      setLoadingStatus("loading");
    }
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

  useEffect(() => {
    return () => {
      clearPrams();
    };
  }, [clearPrams]);

  const onLeadSubmit = () => {
    setLeadPending(false);
    StorageManager.setStorage({
      widgetUid: widgetUid,
      leadSubmitted: true,
    });
    setLeadTempMessage("");
    sendMessage(leadTempMessage, true);
  };

  /**
   * SCROLL MANAGE
   */
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  });

  return (
    <Root>
      <AnimatedHeader style={{ background: layout?.colors.primary || YOUR_GPT_LAYOUT.colors.primary, height: TAB_THEME.headerHeights.chat }} className="ygpt-w-full ygpt-flex ygpt-justify-between ygpt-items-center padX ygpt-h-full ">
        <div>
          <IconBtn onClick={() => navigate("messagesTab")} color="#ffffff">
            <FiArrowLeft size={20} />
          </IconBtn>
        </div>
        {/* 
        <IconBtn color="#ffffff">
          <RiDeleteBin6Fill size={20} />
        </IconBtn> */}
      </AnimatedHeader>

      {/* <Middle> */}
      <ScrollDiv
        color={layout?.colors.primary || YOUR_GPT_LAYOUT.colors.primary}
        className="content ygpt-overflow-x-hidden   ygpt-overflow-y-auto ygpt-flex-1 ygpt-py-2 ygpt-flex ygpt-flex-col  ygpt-items-start ygpt-gap-3"
        style={{ transition: `scroll-behavior 0.5s ease-in-out` }}
        ref={chatContainerRef}
      >
        {newChat && (
          <>
            <ChatItem
              rateMessage={() => {}}
              message={{
                createdAt: null,
                content: { message: layout?.welcomeMessage["en"] },
                from: "assistant",
                localId: "welcome",
              }}
            />
          </>
        )}

        {messages.map((i) => {
          return <ChatItem rateMessage={() => {}} key={i.localId || i.content?.message_id || i.id} message={i} />;
        })}
        {/* {loadingStatus && <>{loadingStatus === "loading" && <span>Loading.....</span>}</>} */}
        {leadTempMessage && (
          <>
            <ChatItem
              message={{
                createdAt: null,
                content: { message: leadTempMessage },
                from: "user",
                localId: "leadTempMessage",
              }}
            />
            <div className="padX">
              <Chatform onResize={() => {}} onSubmit={onLeadSubmit} sessionDetail={sessionData} />
            </div>
          </>
        )}

        {loadingMessages && (
          <div style={{ color: layout?.colors.primary }} className="ygpt-flex ygpt-items-center ygpt-justify-center ygpt-py-8 ygpt-self-stretch">
            <Spinner />
          </div>
        )}
      </ScrollDiv>
      {/* </Middle> */}
      <Bottom>
        <ChatActionBar
          notifyTyping={(is) => {
            console.log(is);
          }}
          sendMessage={sendMessage}
        />
      </Bottom>
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Bottom = styled.div``;
