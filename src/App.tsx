import Chatbot from "components/Chatbot";
import ChatbotFrame from "components/ChatbotFrame";
import WidgetButton from "components/WidgetButton";
import ChatbotProvider from "context/ChatbotContext";

export default function App() {
  return (
    <div className="ygpt-chatbot">
      <ChatbotProvider>
        <ChatbotFrame>
          <Chatbot />
        </ChatbotFrame>
        <WidgetButton />
      </ChatbotProvider>
    </div>
  );
}
