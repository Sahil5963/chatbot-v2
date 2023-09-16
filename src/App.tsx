import { NextUIProvider } from "@nextui-org/system";
import LanguageProvider from "./context/LanguageProvider";
import ChatbotProvider from "./context/ChatbotContext";
import Widget from "./widget";

export default function App() {
  return (
    <LanguageProvider>
      <div className="ygpt-chatbot">
        <NextUIProvider>
          <ChatbotProvider>
            <Widget />
          </ChatbotProvider>
        </NextUIProvider>
      </div>
    </LanguageProvider>
  );
}
