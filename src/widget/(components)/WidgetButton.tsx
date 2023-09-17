import ChatbotLogo from "./logos/Chatbot";
import { FaChevronDown } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useChatbot } from "../context/ChatbotContext";

export default function WidgetButton() {
  const { chatbotPopup, setChatbotPopup, unseenCount } = useChatbot();

  return (
    <div
      onClick={() => setChatbotPopup((s) => !s)}
      className=" ygpt-widgetBtn ygpt-h-[48px] ygpt-w-[48px] ygpt-rounded-full  ygpt-fixed ygpt-flex ygpt-justify-center ygpt-items-center hover:ygpt-scale-105 ygpt-transition-all ygpt-cursor-pointer active:ygpt-scale-[0.88] [&>span]:ygpt-absolute "
    >
      <AnimatePresence>
        {chatbotPopup ? (
          <motion.span key={1} exit={{ opacity: 0, rotate: 20 }} initial={{ opacity: 0, rotate: 20 }} animate={{ opacity: 1, rotate: 0 }}>
            <FaChevronDown />
          </motion.span>
        ) : (
          <motion.span key={2} exit={{ opacity: 0, scale: 0.2, rotate: 60 }} initial={{ opacity: 0, scale: 0.2, rotate: 60 }} animate={{ opacity: 1, scale: 1, rotate: 0 }}>
            <ChatbotLogo />

            {unseenCount > 0 && <div className="ygpt-absolute ygpt-top-[-20px] ygpt-right-[-12px] ygpt-bg-orange-600 ygpt-rounded-full ygpt-h-[24px] ygpt-aspect-square ygpt-flex ygpt-justify-center ygpt-items-center">{unseenCount}</div>}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
