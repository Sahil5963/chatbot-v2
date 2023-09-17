import { motion } from "framer-motion";

import Header from "./Header";
import Footer from "./Footer";
import MDText from "./MDText";
import { MessageD } from "../../types/message";
import { useWidget } from "../../context/WidgetContext";
import { CursorBlink } from "../styles";
import TimeText from "../TimeText";
import { YOUR_GPT_LAYOUT } from "../../utils/constants";

export default function ChatItem({ rateMessage, ...message }: MessageD & { rateMessage: (data: { messageId: number; rate: "1" | "0" }) => any }) {
  const sent = message.from == "user";
  const text = message.content.message;
  const { layout } = useWidget();

  return (
    <div className={`ygpt-flex ygpt-flex-col  ygpt-max-w-[90%] padX  ${sent ? "ygpt-self-end ygpt-items-end" : "ygpt-self-start ygpt-items-start ygpt-mb-3"}`}>
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
          background: sent ? "rgba(0,0,0,0.12)" : layout?.colors.primary || YOUR_GPT_LAYOUT.colors.primary,
          color: sent ? "rgba(0,0,0,0.86)" : layout?.colors.textOnPrimary || YOUR_GPT_LAYOUT.colors.textOnPrimary,
        }}
      >
        <div className="textygpt-break-words ygpt-text-sm">
          {text && <MDText text={text} />} {message.loadingStatus === "streaming" && !message.content.message && <CursorBlink />}
        </div>
      </motion.div>

      <div className={`${sent ? "ygpt-text-right" : "ygpt-text-left"}`}>{message.createdAt && <TimeText time={message.createdAt} />}</div>
      <Footer rateMessage={rateMessage} message={message} />
    </div>
  );
}
