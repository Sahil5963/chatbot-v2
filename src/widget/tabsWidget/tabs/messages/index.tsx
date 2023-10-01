import { motion } from "framer-motion";
import styled from "styled-components";
import { TAB_THEME } from "../../ui";
import { useTabUiChatbot } from "../../context/TabUiContext";
import AnimatedHeader from "../../(components)/AnimatedHeader";
import ChatbotLogo from "../../../(components)/logos/Chatbot";
import ChatIcon from "../../../(components)/icons/ChatIcon";
import { useWidget } from "../../../context/WidgetContext";
import { YOUR_GPT_LAYOUT } from "../../../utils/constants";
import { useTabChatbot } from "../../context/TabContext";
import { useEffect } from "react";
import Spinner from "../../../(components)/Spinner";
import TimeText from "../../../(components)/TimeText";
import { IconBtn } from "../../../(components)/styles";
import { useChatbot } from "../../../context/ChatbotContext";
import { IoMdClose } from "react-icons/io";

export default function Messages() {
  const { navigate } = useTabUiChatbot();
  const { sessions, fetchSessions, refreshingSessions, loadingSessions } = useTabChatbot();
  const { layout } = useWidget();
  const { setChatbotPopup } = useChatbot();

  useEffect(() => {
    fetchSessions(true);
  }, [fetchSessions]);

  return (
    <div className="ygpt-relative ygpt-h-full ygpt-flex-1 ygpt-flex ygpt-flex-col">
      <AnimatedHeader
        style={{ height: TAB_THEME.headerHeights.root, background: layout?.colors.primary || YOUR_GPT_LAYOUT.colors.primary, color: layout?.colors.textOnPrimary || YOUR_GPT_LAYOUT.colors.textOnPrimary }}
        className="ygpt-flex ygpt-items-center ygpt-justify-center ygpt-h-full"
      >
        <div>Messages</div>

        <div className="ygpt-absolute ygpt-right-2">
          <IconBtn onClick={() => setChatbotPopup(false)} className="" color={layout?.colors.textOnPrimary || YOUR_GPT_LAYOUT.colors.textOnPrimary}>
            <IoMdClose size={20} />
          </IconBtn>
        </div>
      </AnimatedHeader>

      <div className="ygpt-flex-1 ygpt-overflow-auto ygpt-pb-24">
        {/* {refreshingSessions && <span className="ygpt-text-sm ygpt-text-gray-400 ygpt-text-center">Updating...</span>}
        {loadingSessions && <span className="ygpt-text-sm ygpt-text-gray-400 ygpt-text-center">Loading...</span>} */}

        {(loadingSessions || refreshingSessions) && (
          <div style={{ color: layout?.colors.primary }} className="ygpt-flex ygpt-items-center ygpt-justify-center ygpt-py-4 ygpt-self-stretch">
            <Spinner size={22} />
          </div>
        )}

        {!loadingSessions && !refreshingSessions && sessions.length === 0 && <div className="ygpt-text-sm ygpt-flex ygpt-justify-center ygpt-text-center ygpt-py-14 ygpt-text-zinc-600">No messages yet</div>}

        {sessions.map((i) => {
          return (
            <ChatItem
              onClick={() => {
                navigate("chatScreen", {
                  sessionData: i,
                });
              }}
              key={i.session_uid}
              color={layout?.colors.primary || YOUR_GPT_LAYOUT.colors.primary}
            >
              <div className="left">
                <div className="avatar" style={{ color: layout?.colors.primary || YOUR_GPT_LAYOUT.colors.primary }}>
                  <ChatbotLogo />
                </div>
              </div>
              <div className="right">
                <div className="text ygpt-line-clamp-1">{i.last_message || layout?.welcomeMessage["en"]}</div>
                <div className="footer">
                  {/* <span className="name ">{i. } AI Bot</span> */}
                  <span className="time">
                    <TimeText time={i.createdAt} />
                  </span>
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
        style={{ color: layout?.colors.textOnPrimary || YOUR_GPT_LAYOUT.colors.textOnPrimary, background: layout?.colors.primary || YOUR_GPT_LAYOUT.colors.primary }}
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
