import ActionBar from "./ActionBar";
import { motion } from "framer-motion";
import ChatItem from "./ChatItem";
import { useChatbot } from "context/ChatbotContext";

export default function Chatbot() {
  const { messages, loadingStatus } = useChatbot();

  return (
    <div className="ygpt-flex ygpt-h-full ygpt-flex-col">
      <motion.div className="ygpt-border-b  ygpt-shadow-sm ygpt-py-3 ygpt-text-center ygpt-text-black">Header</motion.div>

      <div className="content ygpt-overflow-auto ygpt-flex-1 ygpt-py-2 ygpt-flex ygpt-flex-col gap-2 ygpt-items-start ygpt-gap-2 ">
        {messages.map((i) => {
          return <ChatItem key={i.id} {...i} />;
        })}
        {loadingStatus && <>{loadingStatus === "loading" && <span>Loading.....</span>}</>}
      </div>
      <motion.div
        variants={{
          show: {
            opacity: 1,
            y: 0,
          },
          hide: {
            opacity: 0,
            y: "100%",
          },
        }}
        className="footer"
      >
        <ActionBar />
      </motion.div>
    </div>
  );
}
