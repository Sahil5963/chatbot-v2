import { motion } from "framer-motion";
import { MessageD } from "types/message";

export default function ChatItem({ sent, text }: MessageD) {
  return (
    <div className="ygpt-px-2 ygpt-flex ygpt-flex-col ygpt-self-stretch">
      <motion.div
        initial={{
          x: 10,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        // variants={{
        //   hide: {
        //     x: 10,
        //     opacity: 0,
        //   },
        //   show: {
        //   },
        // }}
        className={`  ygpt-max-w-[90%] ygpt-whitespace-pre-wrap ygpt-break-words ygpt-text-sm ygpt-rounded-lg ygpt-p-3 ${sent ? " ygpt-bg-blue-600 ygpt-self-end ygpt-text-white " : "ygpt-bg-gray-100 ygpt-gray-900 ygpt-self-start"}`}
      >
        {text}
      </motion.div>
    </div>
  );
}
