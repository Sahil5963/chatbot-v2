import { motion } from "framer-motion";

import Header from "./Header";
import Footer from "./Footer";
import MDText from "./MDText";
import { MessageD } from "../../types/message";
import { useWidget } from "../../context/WidgetContext";
import { CursorBlink } from "../styles";
import TimeText from "../TimeText";
import { YOUR_GPT_LAYOUT } from "../../utils/constants";
import { getRenderMessageItem } from "../../utils/helper";

export default function ChatItem({ rateMessage, message }: { message: MessageD; rateMessage: (data: { messageId: number; rate: "1" | "0" }) => any }) {
  const { layout } = useWidget();

  const renderMessage = getRenderMessageItem(message);
  return (
    <div className={`ygpt-flex ygpt-flex-col  ygpt-max-w-[90%] padX  ${renderMessage.sent ? "ygpt-self-end ygpt-items-end" : "ygpt-self-start ygpt-items-start ygpt-mb-3"}`}>
      <div className="header">
        <Header message={renderMessage} />
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
        className={` ygpt-rounded-lg ygpt-p-3 ygpt-py-2  ${renderMessage.sent ? "ygpt-rounded-tr-none" : "ygpt-rounded-tl-none"} `}
        style={{
          background: renderMessage.sent ? "rgba(0,0,0,0.12)" : layout?.colors.primary || YOUR_GPT_LAYOUT.colors.primary,
          color: renderMessage.sent ? "rgba(0,0,0,0.86)" : layout?.colors.textOnPrimary || YOUR_GPT_LAYOUT.colors.textOnPrimary,
        }}
      >
        <div className="textygpt-break-words ygpt-text-sm">
          {renderMessage.text && <MDText text={renderMessage.text} />} {renderMessage.loadingStatus === "streaming" && !renderMessage.text && <CursorBlink />}
        </div>
      </motion.div>

      <div className={`${renderMessage.sent ? "ygpt-text-right" : "ygpt-text-left"}`}>{renderMessage.createdAt && <TimeText time={renderMessage.createdAt} />}</div>
      <Footer rateMessage={rateMessage} message={renderMessage} />
    </div>
  );
}
