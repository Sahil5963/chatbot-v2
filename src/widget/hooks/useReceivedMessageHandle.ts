import { useCallback, useEffect, useState } from "react";
import { MessageEventResponse } from "../types/socket";
import { MessageD, MessagesLoadingStatus } from "../types/message";
import socketManager from "../utils/socket";
import { getStreamData } from "../utils";
import { playSound } from "../utils/helper";

type SetMessages = React.Dispatch<React.SetStateAction<MessageD[]>>;

type UseHandleMessageReceivedArgs = {
  messages: MessageD[];
  setMessages: SetMessages;
  sessionData: any;
  widgetUid: string;
  chatbotPopup?: boolean;
  setUnseenCount?: React.Dispatch<React.SetStateAction<number>>;
  setLoadingStatus: React.Dispatch<React.SetStateAction<MessagesLoadingStatus>>;
};

type UseHandleMessageReceived = (args: UseHandleMessageReceivedArgs) => (data: MessageEventResponse) => void;

const useHandleMessageReceived: UseHandleMessageReceived = ({ messages, setMessages, sessionData, widgetUid, chatbotPopup = true, setUnseenCount, setLoadingStatus }) => {
  const [browserTabActive, setBrowserTabActive] = useState(true);

  useEffect(() => {
    document.addEventListener("visibilitychange", () => {
      setBrowserTabActive(document.visibilityState === "visible");
    });
  }, []);

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
        setUnseenCount && setUnseenCount((s) => s + 1);
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
          onUpdate: (res: any) => {
            setLoadingStatus(null);

            socketManager.sendCompose({
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
    [setMessages, sessionData, widgetUid, browserTabActive, chatbotPopup, setUnseenCount, setLoadingStatus, messages]
  );

  return handleMessageReceived;
};

export default useHandleMessageReceived;
