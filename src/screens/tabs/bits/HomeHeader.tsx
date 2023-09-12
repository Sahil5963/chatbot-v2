import { useChatbot } from "context/ChatbotContext";
import { motion } from "framer-motion";
import { styled } from "styled-components";

export default function HomeHeader() {
  const { layout } = useChatbot();

  return (
    <Root layoutId="header" style={{ background: layout?.primaryColor }} transition={{ duration: 0.2 }}>
      <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <img src={layout?.logo} style={{ height: 42 }} />
      </motion.div>
    </Root>
  );
}

const Root = styled(motion.div)`
  padding: 2rem;
`;
