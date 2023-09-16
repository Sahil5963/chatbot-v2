import TabsLayout from "./layout";
import Chat from "./tabs/chat";
import TabUiProvider, { useTabUiChatbot } from "./context/TabUiContext";
import TabProvider from "./context/TabContext";

const Root = () => {
  const { activeRoute } = useTabUiChatbot();

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
};

export default function Tabs() {
  return (
    <TabUiProvider>
      <TabProvider>
        <Root />
      </TabProvider>
    </TabUiProvider>
  );
}
