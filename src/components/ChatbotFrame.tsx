import { useChatbot } from "context/ChatbotContext";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { styled } from "styled-components";

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
            className={`${chatbotPopup ? "show" : ""} ${expanded ? "big" : ""} `}
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

const Root = styled(motion.div)`
  z-index: 9999;
  position: fixed;
  bottom: 84px;
  right: 20px;
  height: min(704px, 100% - 104px);
  min-height: 80px;
  max-width: 400px;
  width: 100%;
  max-height: 704px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 5px 40px;
  border-radius: 16px;
  overflow: hidden;
  /* opacity: 1; */
  transform-origin: right bottom;
  /* transition: width 200ms ease 0s, height 200ms ease 0s, max-height 200ms ease 0s, transform 300ms cubic-bezier(0, 1.2, 1, 1) 0s, opacity 83ms ease-out 0s; */
  /* pointer-events: none; */
  /* display: flex; */
  pointer-events: none;
  transition: max-width 0.3s;
  &.show {
    pointer-events: all;
  }
  &.big {
    max-width: min(800px, 100% - 104px);
  }
`;
