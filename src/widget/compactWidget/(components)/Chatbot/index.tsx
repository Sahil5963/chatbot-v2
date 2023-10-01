import Header from "./Header";
import Footer from "./Footer";
import DefaultQuestions from "./DefaultQuestions";
import { useEffect, useRef } from "react";
import { useCompactChatbot } from "../../context/CompactContext";
import { useWidget } from "../../../context/WidgetContext";
import { ScrollDiv } from "../../../(components)/styles";
import ChatItem from "../../../(components)/ChatItem";
import { YOUR_GPT_LAYOUT } from "../../../utils/constants";
import Chatform from "../../../(components)/ChatForm";
import { StorageManager } from "../../../utils/storage";
import { useChatbot } from "../../../context/ChatbotContext";

export default function Chatbot() {
  const { messages, rateMessage, leadTempMessage, leadPending, setLeadPending, setLeadTempMessage, sendMessage } = useCompactChatbot();
  const { widgetUid } = useChatbot();

  const { layout } = useWidget();

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  // const [userScrolledUp, setUserScrolledUp] = useState(false);

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleScroll = () => {
    // Check if the user has scrolled up manually
    if (chatContainerRef.current) {
      // setUserScrolledUp(chatContainerRef.current.scrollTop + chatContainerRef.current.clientHeight < chatContainerRef.current.scrollHeight);
    }
  };

  const onMessage = (message: string) => {
    if (!message) return;

    if (leadTempMessage) {
      return;
    }

    if (leadPending) {
      setLeadTempMessage(message);
      return;
    }

    sendMessage(message);
  };

  const onLeadSubmit = () => {
    setLeadPending(false);
    StorageManager.setStorage({
      widgetUid: widgetUid,
      leadSubmitted: true,
    });
    setLeadTempMessage("");
    sendMessage(leadTempMessage);
  };

  return (
    <div className="ygpt-flex ygpt-h-full ygpt-flex-col">
      {/* <OverlayLoader /> */}
      <Header />

      <ScrollDiv
        color={layout?.colors.primary || YOUR_GPT_LAYOUT.colors.primary}
        className="content ygpt-overflow-x-hidden   ygpt-overflow-y-auto ygpt-flex-1 ygpt-py-2 ygpt-flex ygpt-flex-col  ygpt-items-start ygpt-gap-3"
        style={{ transition: `scroll-behavior 0.5s ease-in-out` }}
        ref={chatContainerRef}
        onScroll={handleScroll}
      >
        {layout?.welcomeMessage["en"] && (
          <ChatItem
            rateMessage={rateMessage}
            message={{
              createdAt: null,
              content: { message: layout?.welcomeMessage["en"] },
              from: "assistant",
              localId: "welcome",
            }}
          />
        )}

        {/* MESSAGE LIST  */}
        {messages.map((i) => {
          return <ChatItem rateMessage={rateMessage} key={i.localId || i.content.message_id} message={i} />;
        })}

        {leadTempMessage && (
          <div>
            <ChatItem
              message={{
                createdAt: null,
                content: { message: leadTempMessage },
                from: "user",
                localId: "leadTempMessage",
              }}
            />
            <div className="padX ygpt-mt-2">
              <Chatform onResize={() => {}} onSubmit={onLeadSubmit} />
            </div>
          </div>
        )}

        <DefaultQuestions onSend={onMessage} />

        {/* {loadingStatus && <>{loadingStatus === "loading" && <span>Loading.....</span>}</>} */}
      </ScrollDiv>
      <Footer onSend={onMessage} />
    </div>
  );
}

export const padX = "ygpt-px-2";
