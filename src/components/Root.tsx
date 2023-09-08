import Chatbot from "components/Chatbot";
import ChatbotFrame from "components/ChatbotFrame";
import WidgetButton from "components/WidgetButton";
import { useChatbot } from "context/ChatbotContext";

export default function Root() {
  const { isFullPage } = useChatbot();

  return (
    <>
      {isFullPage ? (
        <>
          <div className="ygpt-h-screen ygpt-w-full">
            <Chatbot />
          </div>
        </>
      ) : (
        <>
          <ChatbotFrame>
            <Chatbot />
          </ChatbotFrame>
          <WidgetButton />
        </>
      )}
    </>
  );
}
