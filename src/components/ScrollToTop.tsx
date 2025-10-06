import { ArrowUp } from "lucide-react";
import React, { useEffect, useState } from "react";

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 200);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={` p-1 px-2 text-white rounded-full size-10 bg-primary text-primary-foreground transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"
        } hover:bg-primary/90`}
      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}
    >
      <ArrowUp />
    </button>
  );
};

export default ScrollToTop;
