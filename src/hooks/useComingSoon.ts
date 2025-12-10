import { useEffect, useState } from "react";

/**
 * Hook to check if we should show the coming soon page
 * The page will be hidden at 6 PM today
 */
export const useComingSoon = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const today6PM = new Date();
      today6PM.setHours(18, 0, 0, 0); // 6 PM today

      // If current time is before 6 PM today, show coming soon
      setShowComingSoon(now < today6PM);
    };

    // Check immediately
    checkTime();

    // Check every second to update in real-time when time is up
    // This ensures the page disappears immediately at 6 PM
    const interval = setInterval(checkTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return showComingSoon;
};

