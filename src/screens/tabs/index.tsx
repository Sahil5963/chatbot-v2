import { useTabsChatbot } from "context/TabsChatbotContext";
import TabsLayout from "./layout";
import Chat from "./chat";

export default function Tabs() {
  const { activeRoute } = useTabsChatbot();

  let content = <TabsLayout />;

  switch (activeRoute.name) {
    case "allTabs":
      content = <TabsLayout />;
      break;
    case "chatScreen":
      content = <Chat />;
      break;
    default:
      content = <TabsLayout />;
  }

  return <div className="ygpt-flex ygpt-h-full ygpt-flex-1 ygpt-flex-col ">{content}</div>;
}
