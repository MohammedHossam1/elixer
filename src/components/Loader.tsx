"use client";
import { motion } from "framer-motion";

const Loader = () => {
  // 🔹 نعمل كل حرف يدخل بشكل stagger
  const letters = "ELIXIR".split("");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // كل حرف يدخل بعد التاني
      },
    },
  };

  const letter = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        repeat: Infinity,    
        repeatType: "reverse",    
      },
  
    },
  };

  return (
    <div className="flex items-center justify-center fixed inset-0 z-50 bg-background">
      <motion.h1
        className="font-script text-4xl lg:text-5xl xl:text-6xl  text-primary font-bold tracking-wider  space-x-2"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {letters.map((char, index) => (
          <motion.span
            key={index}
            variants={letter}
            
        
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
};

export default Loader;
