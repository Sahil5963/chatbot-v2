import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { styled } from "styled-components";
import { useChatbot } from "../context/ChatbotContext";

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

  return (
    <>
      <AnimatePresence>
        {chatbotPopup && (
          <Root
            className={`ygpt-frame ${chatbotPopup ? "show" : ""} ${expanded ? "big" : ""} `}
            variants={frameVariants}
            initial="hide"
            animate="show"
            exit="hide"
            transition={{
              delayChildren: 0.2,
              damping: 100,
            }}
          >
            <motion.div className="ygpt-relative ygpt-h-full">{children}</motion.div>
          </Root>
        )}
      </AnimatePresence>
    </>
  );
}

const Root = styled(motion.div)``;