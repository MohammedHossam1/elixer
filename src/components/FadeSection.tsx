import { motion, cubicBezier } from "framer-motion";
import { useEffect, useState } from "react";

const fancyVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: cubicBezier(0.25, 1, 0.5, 1),
    },
  },
};

export const FadeInSection = ({ children, stop }: { children: React.ReactNode, stop?: boolean }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768); // أقل من md
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);
  if (isMobile && stop) {
    return <div>{children}</div>;
  }
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
