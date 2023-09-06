import { NextUIProvider } from "@nextui-org/system";
import Root from "components/Root";
import ChatbotProvider from "context/ChatbotContext";

export default function App() {
  return (
    <div className="ygpt-chatbot">
      <NextUIProvider>
        <ChatbotProvider>
          <Root />
        </ChatbotProvider>
      </NextUIProvider>
    </div>
  );
}
