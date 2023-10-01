import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { useChatbot } from "../context/ChatbotContext";
import { useWidget } from "../context/WidgetContext";

const frameVariants = {
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  hide: {
    opacity: 0,
    scale: 0,
    y: 10,
  },
  exit: {
    opacity: 0,
    scale: 0,
    y: 10,
  },
};

export default function ChatbotFrame({ children }: { children: React.ReactNode }) {
  const { chatbotPopup, expanded } = useChatbot();
  const { layout } = useWidget();

  return (
    <>
      {/* <AnimatePresence> */}
      <Root
        className={` ygpts-frame ${chatbotPopup ? "show" : ""} ${expanded ? "big" : ""} ${chatbotPopup ? "show" : "hide"}`}
        variants={frameVariants}
        initial="hide"
        animate={chatbotPopup ? "show" : "hide"}
        exit="hide"
        transition={{
          delayChildren: 0.2,
          damping: 100,
        }}
        style={{
          transformOrigin: layout?.position.align === "left" ? "left bottom" : "right bottom",
        }}
      >
        <motion.div className="ygpt-relative ygpt-h-full">{children}</motion.div>
      </Root>
      {/* </AnimatePresence> */}
    </>
  );
}

const Root = styled(motion.div)`
  &.show {
    pointer-events: all;
  }
  &.hide {
    pointer-events: none;
  }
`;
