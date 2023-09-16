import { motion } from "framer-motion";
import { styled } from "styled-components";
import { useWidget } from "../../context/WidgetContext";

export default function HomeHeader() {
  const { layout, setting } = useWidget();

  return (
    <Root layoutId="header" style={{ background: layout?.colors.primary }} transition={{ duration: 0.2 }}>
      <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <img src={setting?.logo} style={{ height: 42 }} />
      </motion.div>
    </Root>
  );
}

const Root = styled(motion.div)`
  padding: 2rem;
`;
