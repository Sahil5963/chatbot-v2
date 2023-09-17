import { useMemo } from "react";
import ChatbotProvider, { useChatbot } from "./context/ChatbotContext";
import Compact from "./compactWidget";
import Tabs from "./tabsWidget";
import ChatbotFrame from "./(components)/ChatbotFrame";
import WidgetButton from "./(components)/WidgetButton";
import WidgetProvider, { useWidget } from "./context/WidgetContext";
import { RootStyles } from "./styles/RootStyles";
import LanguageProvider from "./context/LanguageProvider";
import { WidgetPlace } from "./types";
import { YOUR_GPT_LAYOUT } from "./utils/constants";

const Root = () => {
  const { isFullPage, widgetPlace } = useChatbot();
  const { layout } = useWidget();

  const content = useMemo(() => {
    if (layout?.type === "compact") {
      return <Compact />;
    } else if (layout?.type === "tab") {
      return <Tabs />;
    } else {
      return <></>;
    }
  }, [layout?.type]);

  return (
    <RootStyles layout={layout || YOUR_GPT_LAYOUT} className={`widgetPlace-${widgetPlace}`}>
      {isFullPage ? (
        <>
          <div className="ygpt-h-screen ygpt-w-full">{content}</div>
        </>
      ) : (
        <>
          <ChatbotFrame>{content}</ChatbotFrame>
          <WidgetButton />
        </>
      )}
    </RootStyles>
  );
};

export default function Widget({ widgetPlace = "chatbot" }: { widgetPlace?: WidgetPlace }) {
  return (
    <LanguageProvider>
      <div className="ygpt-chatbot">
        <ChatbotProvider widgetPlace={widgetPlace}>
          <WidgetProvider>
            <Root />
          </WidgetProvider>
        </ChatbotProvider>
      </div>
    </LanguageProvider>
  );
}
