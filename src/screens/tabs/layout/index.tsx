import { useTabsChatbot } from "context/TabsChatbotContext";
import Messages from "../messages";
import Home from "../home";
import Profile from "../profile";
import { useChatbot } from "context/ChatbotContext";
import { useMemo } from "react";
import { styled } from "styled-components";
import HomeIcon from "components/icons/HomeIcon";
import ChatIcon from "components/icons/ChatIcon";
import AccountIcon from "components/icons/AccountIcon";
import { TAB_THEME } from "../ui";

export default function TabsLayout() {
  const { activeRoute, navigate } = useTabsChatbot();
  const { layout } = useChatbot();

  let activeScreen = <Home />;

  switch (activeRoute.name) {
    case "homeTab":
      activeScreen = <Home />;
      break;
    case "messagesTab":
      activeScreen = <Messages />;
      break;
    case "profileTab":
      activeScreen = <Profile />;
      break;
    default:
      activeScreen = <Home />;
  }

  const TABS = useMemo(() => {
    if (layout) {
      return layout.bottomTabs
        ?.filter((i) => i.visibility === "1")
        .map((i) => {
          let content = <></>;

          if (i.key === "homeTab") {
            content = (
              <>
                <div>
                  <HomeIcon filled={activeRoute.name === "homeTab"} />
                </div>
                <div className="text">{i.title}</div>
              </>
            );
          } else if (i.key === "messagesTab") {
            content = (
              <>
                <div>
                  <ChatIcon filled={activeRoute.name === "messagesTab"} />
                </div>
                <div className="text">{i.title}</div>
              </>
            );
          } else if (i.key === "profileTab") {
            content = (
              <>
                <div>
                  <AccountIcon filled={activeRoute.name === "profileTab"} />
                </div>
                <div className="text">{i.title}</div>
              </>
            );
          }

          return (
            <TabItem
              onClick={() => {
                if (i.key) {
                  navigate(i.key);
                }
              }}
              key={i.key}
              color={layout.primaryColor}
              className={`${i.key === activeRoute.name ? "active" : ""}`}
            >
              {content}
            </TabItem>
          );
        });
    }
  }, [layout, activeRoute.name, navigate]);

  return (
    <Root>
      <Content>{activeScreen}</Content>
      <Tabs className="ygpt-flex ygpt-justify-between [&>div]:ygpt-flex-1">{TABS}</Tabs>
    </Root>
  );
}

const Root = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const Content = styled.div`
  flex: 1;
  overflow-y: auto;
`;
const Tabs = styled.div`
  box-shadow: 0px -1px 2px 0px rgba(0, 0, 0, 0.04);
`;
const TabItem = styled.div<{ color: string }>`
  height: ${TAB_THEME.tabHeight}px;

  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${({ color }) => color};
  }
  &.active {
    color: ${({ color }) => color};
  }

  .text {
    font-size: 14px;
  }
`;
