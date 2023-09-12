import { NextUIProvider } from "@nextui-org/system";
import ChatbotProvider from "context/ChatbotContext";
import LanguageProvider from "context/LanguageProvider";
import Screens from "screens";

export default function App() {
  return (
    <LanguageProvider>
      <div className="ygpt-chatbot">
        <NextUIProvider>
          <ChatbotProvider>
            <Screens />
          </ChatbotProvider>
        </NextUIProvider>
      </div>
    </LanguageProvider>
  );
}
