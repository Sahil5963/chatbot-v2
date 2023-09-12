import { MotionStyle, motion } from "framer-motion";

export default function AnimatedHeader({ children, style, className }: { children: React.ReactNode; className?: string; style?: MotionStyle }) {
  return (
    <motion.div style={style} layoutId="header" transition={{ duration: 0.2 }} className="ygpt-w-full ygpt-font-medium">
      <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className={className}>
        {children}
      </motion.div>
    </motion.div>
  );
}
