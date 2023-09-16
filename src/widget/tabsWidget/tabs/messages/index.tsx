import { motion } from "framer-motion";
import { styled } from "styled-components";
import { TAB_THEME } from "../../ui";
import { useTabUiChatbot } from "../../context/TabUiContext";
import AnimatedHeader from "../../(components)/AnimatedHeader";
import { THEME } from "../../../../utils/constants/ui";
import ChatbotLogo from "../../../components/logos/Chatbot";
import ChatIcon from "../../../components/icons/ChatIcon";
import { useWidget } from "../../../context/WidgetContext";

export default function Messages() {
  const { navigate } = useTabUiChatbot();
  const { layout } = useWidget();

  return (
    <div className="ygpt-relative ygpt-h-full ygpt-flex-1 ygpt-flex ygpt-flex-col">
      <AnimatedHeader
        style={{ height: TAB_THEME.headerHeights.root, background: layout?.colors.primary || THEME.primaryColor, color: layout?.colors.textOnPrimary || THEME.textOnPrimary }}
        className="ygpt-flex ygpt-items-center ygpt-justify-center ygpt-h-full"
      >
        <div>Messages</div>
      </AnimatedHeader>

      <div className="ygpt-flex-1 ygpt-overflow-auto ygpt-pb-24">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => {
          return (
            <ChatItem
              onClick={() => {
                navigate("chatScreen");
              }}
              key={i}
              color={layout?.colors.primary || THEME.primaryColor}
            >
              <div className="left">
                <div className="avatar">
                  <ChatbotLogo />
                </div>
              </div>
              <div className="right">
                <div className="text ygpt-line-clamp-1">No problem, I will check thr pricing getting things done</div>
                <div className="footer">
                  <span className="name ">AI Bot</span>
                  <span className="time">12:30 PM</span>
                </div>
              </div>
            </ChatItem>
          );
        })}
      </div>

      <motion.button
        onClick={() => {
          navigate("chatScreen");
        }}
        initial={{ opacity: 0, scale: 0.5, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className="ygpt-flex ygpt-self-center ygpt-gap-3 ygpt-absolute ygpt-bottom-[40px] ygpt-items-center ygpt-px-4 ygpt-h-[42px] ygpt-rounded-lg hover:ygpt-scale-105 hover:ygpt-shadow-md ygpt-text-sm"
        style={{ color: layout?.colors.textOnPrimary || THEME.textOnPrimary, background: layout?.colors.primary || THEME.primaryColor }}
      >
        <ChatIcon filled /> Start new conversation
      </motion.button>
    </div>
  );
}

const ChatItem = styled.div<{ color: string }>`
  display: flex;
  gap: 1rem;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  position: relative;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(p) => p.color + "14"};
    border-bottom-color: ${(p) => p.color + "14"};
  }

  .left {
  }
  .right {
    padding-right: 20px;
    flex: 1;
  }

  .avatar {
    height: 100%;
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .footer {
    display: flex;
    gap: 1rem;
  }

  .text {
    font-size: 14px;
    margin-bottom: 0.4rem;
  }

  .name,
  .time {
    font-size: 14px;
    font-weight: 400;
    opacity: 0.6;
  }
`;
