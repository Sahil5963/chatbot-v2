import { useChatbot } from "context/ChatbotContext";
import { motion } from "framer-motion";
import { MessageD } from "types/message";
import { padX } from "..";
import TimeText from "components/TimeText";
import Header from "./Header";
import Footer from "./Footer";
import MDText from "./MDText";
import { CursorBlink } from "components/styles";

export default function ChatItem(message: MessageD) {
  const sent = message.from == "user";
  const text = message.content.message;
  const { chatbotSettings } = useChatbot();

  return (
    <div className={`ygpt-flex ygpt-flex-col  ygpt-max-w-[90%] ${padX}  ${sent ? "ygpt-self-end ygpt-items-end" : "ygpt-self-start ygpt-items-start ygpt-mb-3"}`}>
      <div className="header">
        <Header message={message} />
      </div>

      <motion.div
        initial={{
          x: 10,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        className={` ygpt-rounded-lg ygpt-p-3 ygpt-py-2  ${sent ? "ygpt-rounded-tr-none" : "ygpt-rounded-tl-none"} `}
        style={{
          background: sent ? chatbotSettings?.message_bg_color : chatbotSettings?.reply_bg_color,
          color: sent ? chatbotSettings?.message_text_color : chatbotSettings?.reply_text_color,
        }}
      >
        <div className="textygpt-break-words ygpt-text-sm">
          {text && <MDText text={text} />} {message.loadingStatus === "streaming" && !message.content.message && <CursorBlink />}
        </div>
      </motion.div>

      <div className={`${sent ? "ygpt-text-right" : "ygpt-text-left"}`}>{message.createdAt && <TimeText time={message.createdAt} />}</div>
      <Footer message={message} />
    </div>
  );
}
