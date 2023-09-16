import { useMemo } from "react";
import { useChatbot } from "../context/ChatbotContext";
import Compact from "./compactWidget";
import Tabs from "./tabsWidget";
import ChatbotFrame from "./components/ChatbotFrame";
import WidgetButton from "./components/WidgetButton";
import WidgetProvider, { useWidget } from "./context/WidgetContext";

const Root = () => {
  const { isFullPage } = useChatbot();
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
    <>
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
    </>
  );
};

export default function Widget() {
  return (
    <WidgetProvider>
      <Root />
    </WidgetProvider>
  );
}
