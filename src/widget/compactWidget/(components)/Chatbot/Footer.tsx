import { motion } from "framer-motion";
import { HIDE_FOOTER } from "../../../utils/helper";
import { useChatbot } from "../../../context/ChatbotContext";
import ChatActionBar from "../../../(components)/ChatActionBar";
export default function Footer({ onSend }: { onSend: (text: string) => void }) {
  const { isFullPage, chatbotSettings, notifyTyping } = useChatbot();

  return (
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
      transition={{
        type: "tween",
      }}
    >
      <ChatActionBar notifyTyping={notifyTyping} sendMessage={onSend} />
      {HIDE_FOOTER && isFullPage ? null : (
        <div className="ygpt-text-sm ygpt-flex ygpt-justify-center ygpt-bg-gray-50 ygpt-py-[4px]">
          <div>
            <span style={{ opacity: "50%", fontSize: "inherit" }}>Powered by </span>
            <strong>
              <a
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontSize: 14,
                  opacity: "70%",
                }}
                href={`https://yourgpt.ai/chatbot`}
              >
                {/* {chatbotSettings?.branding_title} */}
                YourGPT
              </a>
            </strong>
          </div>
        </div>
      )}
    </motion.div>
  );
}
