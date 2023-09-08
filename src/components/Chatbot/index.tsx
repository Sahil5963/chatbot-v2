import ChatItem from "./ChatItem";
import { useChatbot } from "context/ChatbotContext";
import Header from "./Header";
import Footer from "./Footer";
import DefaultQuestions from "./DefaultQuestions";
import { useEffect, useRef } from "react";
import { THEME } from "utils/constants/ui";
import { ScrollDiv } from "components/styles";

export default function Chatbot() {
  const { messages, chatbotSettings } = useChatbot();

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

  return (
    <div className="ygpt-flex ygpt-h-full ygpt-flex-col">
      {/* <OverlayLoader /> */}
      <Header />

      <ScrollDiv
        color={chatbotSettings?.widget_color || THEME.primaryColor}
        className="content ygpt-overflow-x-hidden   ygpt-overflow-y-auto ygpt-flex-1 ygpt-py-2 ygpt-flex ygpt-flex-col  ygpt-items-start ygpt-gap-3 "
        style={{ transition: `scroll-behavior 0.5s ease-in-out` }}
        ref={chatContainerRef}
        onScroll={handleScroll}
      >
        {chatbotSettings?.welcome_message && <ChatItem createdAt={null} content={{ message: chatbotSettings?.welcome_message }} from="assistant" localId={"welcome"} />}

        <DefaultQuestions />

        {/* MESSAGE LIST  */}
        {messages.map((i) => {
          return <ChatItem key={i.localId || i.content.message_id} {...i} />;
        })}
        {/* {loadingStatus && <>{loadingStatus === "loading" && <span>Loading.....</span>}</>} */}
      </ScrollDiv>
      <Footer />
    </div>
  );
}

export const padX = "ygpt-px-2";
