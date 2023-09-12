import Chatbot from "components/Chatbot";
import CompactChatbotProvider from "context/CompactChatbotContext";

export default function Compact() {
  return (
    <CompactChatbotProvider>
      <Chatbot />
    </CompactChatbotProvider>
  );
}
