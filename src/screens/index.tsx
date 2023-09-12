import ChatbotFrame from "components/ChatbotFrame";
import WidgetButton from "components/WidgetButton";
import { useChatbot } from "context/ChatbotContext";
import CompactChatbotProvider from "context/CompactChatbotContext";
import TabsChatbotProvider from "context/TabsChatbotContext";
import { ReactNode, useMemo } from "react";
import Compact from "screens/compact";
import Tabs from "screens/tabs";

const Wrapper = ({ children }: { children: ReactNode }) => {
  const { layout } = useChatbot();

  if (layout?.type === "compact") {
    return <CompactChatbotProvider>{children}</CompactChatbotProvider>;
  } else if (layout?.type === "tabs") {
    return <TabsChatbotProvider>{children}</TabsChatbotProvider>;
  } else {
    return children;
  }
};

export default function Screens() {
  const { isFullPage, layout } = useChatbot();

  const content = useMemo(() => {
    if (layout?.type === "compact") {
      return <Compact />;
    } else if (layout?.type === "tabs") {
      return <Tabs />;
    } else {
      return null;
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
          <Wrapper>
            <ChatbotFrame>{content}</ChatbotFrame>
            <WidgetButton />
          </Wrapper>
        </>
      )}
    </>
  );
}
