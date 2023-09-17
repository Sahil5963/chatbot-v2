import { motion } from "framer-motion";
import { styled } from "styled-components";
import { useWidget } from "../../context/WidgetContext";
import { YOUR_GPT_SETTING } from "../../utils/constants";
import ChatbotLogo from "../../(components)/logos/Chatbot";

export default function HomeHeader() {
  const { layout, setting } = useWidget();

  return (
    <Root className=" ygpt-py-4 ygpt-px-4" layoutId="header" style={{ background: layout?.colors.primary }} transition={{ duration: 0.2 }}>
      <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div style={{ color: layout?.colors.textOnPrimary }} className="ygpt-flex ygpt-items-center ygpt-gap-2">
          {setting?.logo ? <img src={setting?.logo} style={{ height: 52 }} /> : <ChatbotLogo size={52} />}
          <div className="ygpt-text-xl ygpt-font-medium">{setting?.name || YOUR_GPT_SETTING.name}</div>
        </div>
      </motion.div>
    </Root>
  );
}

const Root = styled(motion.div)``;
