import ChatbotLogo from "./logos/Chatbot";
import { FaChevronDown } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useChatbot } from "context/ChatbotContext";

export default function WidgetButton() {
  const { chatbotPopup, setChatbotPopup } = useChatbot();

  return (
    <div
      onClick={() => setChatbotPopup((s) => !s)}
      className="ygpt-h-[48px] ygpt-w-[48px] ygpt-rounded-full ygpt-text-white ygpt-bg-blue-700 ygpt-fixed ygpt-flex ygpt-justify-center ygpt-items-center hover:ygpt-scale-105 ygpt-transition-all ygpt-cursor-pointer active:ygpt-scale-[0.88] [&>span]:ygpt-absolute "
      style={{
        right: "20px",
        bottom: "20px",
      }}
    >
      <AnimatePresence>
        {chatbotPopup ? (
          <motion.span key={1} exit={{ opacity: 0, rotate: 20 }} initial={{ opacity: 0, rotate: 20 }} animate={{ opacity: 1, rotate: 0 }}>
            <FaChevronDown />
          </motion.span>
        ) : (
          <motion.span key={2} exit={{ opacity: 0, scale: 0.2, rotate: 60 }} initial={{ opacity: 0, scale: 0.2, rotate: 60 }} animate={{ opacity: 1, scale: 1, rotate: 0 }}>
            <ChatbotLogo />
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
