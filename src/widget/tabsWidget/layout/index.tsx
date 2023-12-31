import Messages from "../tabs/messages";
import Home from "../tabs/home";
import Profile from "../tabs/profile";
import { useMemo } from "react";
import styled from "styled-components";
import { useWidget } from "../../context/WidgetContext";
import { useTabUiChatbot } from "../context/TabUiContext";
import HomeIcon from "../../(components)/icons/HomeIcon";
import ChatIcon from "../../(components)/icons/ChatIcon";
import AccountIcon from "../../(components)/icons/AccountIcon";
import { BottomTabsD } from "../../types/layout";
import { TAB_THEME } from "../ui";
import { HIDE_FOOTER } from "../../utils/helper";
import { useChatbot } from "../../context/ChatbotContext";

export default function TabsLayout() {
  const { activeRoute, navigate } = useTabUiChatbot();
  const { layout } = useWidget();
  const { isFullPage } = useChatbot();

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
      // return layout.bottomTabs
      //   ?.filter((i) => i.visibility === "1")
      return [
        {
          key: "homeTab" as BottomTabsD,
          title: "Home",
        },
        {
          key: "messagesTab" as BottomTabsD,
          title: "Messages",
        },
      ].map((i) => {
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
            color={layout.colors.primary}
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
      {HIDE_FOOTER && isFullPage ? null : (
        <div className="ygpt-text-xs ygpt-flex ygpt-justify-center ygpt-bg-gray-50 ygpt-py-[4px]">
          <div>
            <span style={{ opacity: "50%", fontSize: "inherit" }}>Powered by </span>
            <a
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "none",
                color: "inherit",
                fontSize: 14,
                opacity: "70%",
                fontWeight: "bold",
              }}
              href={`https://yourgpt.ai/chatbot`}
            >
              {/* {chatbotSettings?.branding_title} */}
              YourGPT
            </a>
          </div>
        </div>
      )}
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
