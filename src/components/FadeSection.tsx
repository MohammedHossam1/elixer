import { motion, cubicBezier } from "framer-motion";

const fancyVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9, rotate: -2 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 1.2,
      ease: cubicBezier(0.25, 1, 0.5, 1), 
    },
  },
};

export const FadeInSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      variants={fancyVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
};
