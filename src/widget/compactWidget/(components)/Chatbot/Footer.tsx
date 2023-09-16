import { motion } from "framer-motion";
import ActionBar from "./ActionBar";
import { HIDE_FOOTER } from "../../../../utils/helper";
import { useChatbot } from "../../../../context/ChatbotContext";
export default function Footer() {
  const { isFullPage, chatbotSettings } = useChatbot();

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
      <ActionBar />
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
                href={chatbotSettings?.branding_link}
              >
                {chatbotSettings?.branding_title}
              </a>
            </strong>
          </div>
        </div>
      )}
    </motion.div>
  );
}
